#!/usr/bin/env python3
"""loopcut.py - cut seamless 4/8-bar loops from Creative Commons tracks.

Usage (run with -I so a planted module in the cwd cannot be imported):
    python3 -I tools/loopcut.py [--raw DIR] [--styles a,b,c] [--jobs N]

Input : <raw>/<style>/NN.mp3 + <raw>/<style>/manifest.json (artist, title, album,
        license, licenseUrl, url ...).
Output: assets/loops/<style>/<style>-NN.mp3  (128 kbps stereo, whole buffer = one seamless loop)
        assets/loops/loops-data.json   (merged state so a partial rerun keeps other styles)
        assets/loops/CREDITS.md, assets/loops/review.html, js/content/loops.js

Method per track: decode 44.1 kHz stereo, beat-track (genre tempo prior), score every
4/8-bar window that starts and ends between 15% and 85% of the track (RMS near the track's
upper quartile, steady beats, strong beat/onset alignment, bar-phase confidence from
kick/onset strength, even energy across bars), snap cut points to the nearest attack and
fine-match the end against the head, equal-power crossfade the tail into the pre-head
(15 ms), loudness-match to -16 LUFS (BS.1770 K-weighted, gated), encode, decode back and
verify length (+-30 ms), peak (< -1 dBFS) and seam click.
"""
import os
for _v in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS", "NUMBA_NUM_THREADS",
           "VECLIB_MAXIMUM_THREADS"):
    os.environ.setdefault(_v, "1")

import argparse
import html
import json
import re
import sys
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

import numpy as np
import scipy.signal as ss
import soundfile as sf

SR = 44100
AR = 22050          # analysis sample rate
HOP = 128           # analysis hop at AR (5.8 ms)
XF_SEC = 0.015
TARGET_LUFS = -16.0
PEAK_CEIL = 0.84    # ~ -1.5 dBFS before encoding (MP3 can overshoot a little)
LOCAL_SLOTS = 8     # loop slots 01-08 go to local bands, 09+ to touring bands
MP3_LEVEL = 0.65    # libsndfile compression_level that gives 128 kbps CBR

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RAW = str(Path.home() / "Documents/PROGRAMS/scenebooker-raw-audio")  # outside the project; untrusted downloads

# starting tempo guess per style (beat tracker prior, helps avoid half/double time)
PRIOR = {"hardcore": 180, "pop-punk": 170, "emo": 140, "crust": 170, "garage": 150,
         "post-punk": 130, "indie": 125, "metal": 150, "ska": 160, "folk-punk": 150,
         "noise": 140, "street-punk": 170, "powerviolence": 180, "sludge": 80,
         "shoegaze": 120, "math-rock": 130, "surf": 150, "darkwave": 120}


# ---------------------------------------------------------------- audio helpers
def load_stereo(path):
    import librosa
    y, sr = sf.read(str(path), dtype="float32", always_2d=True)
    if y.shape[1] == 1:
        y = np.repeat(y, 2, axis=1)
    elif y.shape[1] > 2:
        y = y[:, :2]
    if sr != SR:
        y = np.stack([librosa.resample(y[:, c], orig_sr=sr, target_sr=SR) for c in range(2)], 1)
    return np.ascontiguousarray(y, dtype=np.float32)


def _kweight(x, fs):
    # BS.1770 stage 1 (high shelf) and stage 2 (high-pass), designed for any fs
    G, Q, fc = 3.999843853973347, 0.7071752369554196, 1681.9744509555319
    A = 10 ** (G / 40); w0 = 2 * np.pi * fc / fs; al = np.sin(w0) / (2 * Q); c = np.cos(w0); sA = np.sqrt(A)
    b = np.array([A * ((A + 1) + (A - 1) * c + 2 * sA * al), -2 * A * ((A - 1) + (A + 1) * c),
                  A * ((A + 1) + (A - 1) * c - 2 * sA * al)])
    a = np.array([(A + 1) - (A - 1) * c + 2 * sA * al, 2 * ((A - 1) - (A + 1) * c),
                  (A + 1) - (A - 1) * c - 2 * sA * al])
    x = ss.lfilter(b / a[0], a / a[0], x, axis=0)
    Q2, fc2 = 0.5003270373238773, 38.13547087613982
    w0 = 2 * np.pi * fc2 / fs; al = np.sin(w0) / (2 * Q2); c = np.cos(w0)
    b = np.array([(1 + c) / 2, -(1 + c), (1 + c) / 2]); a = np.array([1 + al, -2 * c, 1 - al])
    return ss.lfilter(b / a[0], a / a[0], x, axis=0)


def lufs(x, fs=SR):
    z = _kweight(x.astype(np.float64), fs)
    blk, step = int(0.4 * fs), int(0.1 * fs)
    cs = np.vstack([np.zeros((1, z.shape[1])), np.cumsum(z * z, axis=0)])
    if len(z) < blk:
        ms = np.array([np.sum(np.mean(z * z, axis=0))])
    else:
        st = np.arange(0, len(z) - blk + 1, step)
        ms = np.sum((cs[st + blk] - cs[st]) / blk, axis=1)
    l = -0.691 + 10 * np.log10(ms + 1e-12)
    g = ms[l > -70]
    if len(g) == 0:
        return -70.0
    rel = -0.691 + 10 * np.log10(np.mean(g)) - 10
    g2 = ms[l > rel]
    if len(g2) == 0:
        g2 = g
    return float(-0.691 + 10 * np.log10(np.mean(g2)))


def soft_ceiling(x, k=0.70, m=PEAK_CEIL):
    ax = np.abs(x)
    over = ax > k
    if not over.any():
        return x
    y = x.copy()
    y[over] = np.sign(x[over]) * (k + (m - k) * np.tanh((ax[over] - k) / (m - k)))
    return y


def normalize(loop, target=TARGET_LUFS):
    """Gain to target LUFS; soft-ceiling stray peaks. Returns (audio, pre_lufs, gain_db)."""
    pre = lufs(loop)
    g = 10 ** ((target - pre) / 20)
    y = soft_ceiling(loop * g)
    # soft ceiling lowers loudness a little; one correction pass
    for _ in range(3):
        post = lufs(y)
        if abs(post - target) < 0.1:
            break
        g *= 10 ** ((target - post) / 20)
        y = soft_ceiling(loop * g)
    return np.clip(y, -0.999, 0.999).astype(np.float32), pre, 20 * np.log10(g)


# ---------------------------------------------------------------- cut-point refinement
def fine_onset(mono, center, half=0.025):
    """Position of the sharpest energy rise within +-half s of center (sample), minus 1 ms."""
    w = int(0.002 * SR)
    a = max(w, center - int(half * SR)); b = min(len(mono) - w - 1, center + int(half * SR))
    if b - a < 4 * w:
        return center
    seg = mono[a - w:b + w + 1].astype(np.float64) ** 2
    cs = np.concatenate([[0.0], np.cumsum(seg)])
    p = np.arange(w, len(seg) - w)
    ahead = cs[p + w] - cs[p]; behind = cs[p] - cs[p - w]
    rise = np.log(ahead + 1e-9) - np.log(behind + 1e-9)
    j = int(np.argmax(rise))
    if rise[j] < 0.7:
        return center
    return int(a - w + p[j] - int(0.001 * SR))


def refine_end(mono, s, e0, W=1200, span=96):
    """Shift the end by up to +-2 ms so the wave before it matches the wave before the start."""
    ref = mono[s - W:s].astype(np.float64)
    ref = ref - ref.mean(); rn = np.linalg.norm(ref) + 1e-9
    best, bd = -2.0, 0
    for d in range(-span, span + 1):
        e = e0 + d
        if e > len(mono) or e - W < 0:
            continue
        seg = mono[e - W:e].astype(np.float64); seg = seg - seg.mean()
        c = float(np.dot(ref, seg) / (rn * (np.linalg.norm(seg) + 1e-9)))
        if c > best:
            best, bd = c, d
    return e0 + bd, best


def make_loop(y, s, e):
    L = e - s
    xf = int(XF_SEC * SR)
    out = y[s:e].copy()
    t = np.linspace(0, 1, xf, endpoint=False, dtype=np.float32)[:, None]
    fo, fi = np.cos(t * np.pi / 2), np.sin(t * np.pi / 2)
    out[L - xf:] = y[e - xf:e] * fo + y[s - xf:s] * fi
    return out


# ---------------------------------------------------------------- analysis

def _lowband(ym, n_fft=2048, hop=HOP, block=2048):
    """Sum of |STFT| bins 1..14 per frame (same frames as librosa.stft(center=True)), computed a block of frames
    at a time so a whole song's spectrogram is never in memory."""
    pad = n_fft // 2
    x = np.pad(ym, pad, mode="constant")
    n_frames = 1 + (len(x) - n_fft) // hop
    win = np.hanning(n_fft + 1)[:-1].astype(np.float32)
    k = np.arange(1, 15)
    basis = np.exp(-2j * np.pi * np.outer(k, np.arange(n_fft)) / n_fft).astype(np.complex64)  # 14 x n_fft
    out = np.empty(n_frames, dtype=np.float32)
    for f0 in range(0, n_frames, block):
        f1 = min(n_frames, f0 + block)
        idx = (np.arange(f0, f1) * hop)[:, None] + np.arange(n_fft)[None, :]
        frames = x[idx] * win
        out[f0:f1] = np.abs(frames @ basis.T).sum(axis=1)
    return out

def analyze(path, style):
    import librosa
    try:
        y = load_stereo(path)
        mono = y.mean(axis=1)
        T = len(mono) / SR
        if T < 40:
            return {"error": "too short (%.0fs)" % T}
        ym = librosa.resample(mono, orig_sr=SR, target_sr=AR)
        oenv = librosa.onset.onset_strength(y=ym, sr=AR, hop_length=HOP)
        # low band only, a block at a time (a whole song's spectrogram at this hop is ~600 MB)
        low = _lowband(ym)
        lflux = np.maximum(0, np.diff(low, prepend=low[0]))
        n = min(len(oenv), len(lflux)); oenv, lflux = oenv[:n], lflux[:n]
        # Beat-track on a 4x coarser grid (librosa's tracker peaks near 3 GB at HOP=128 on a 3-minute song),
        # then move each beat to the strongest fine frame within +-2 coarse hops. Cuts are snapped later anyway.
        CO = 4
        oc = oenv[:len(oenv) // CO * CO].reshape(-1, CO).max(axis=1)
        tempo, bc = librosa.beat.beat_track(onset_envelope=oc, sr=AR, hop_length=HOP * CO,
                                            start_bpm=PRIOR.get(style, 140), tightness=100)
        bf = []
        for c in np.asarray(bc, dtype=int):
            lo, hi = max(0, (c - 1) * CO), min(n, (c + 2) * CO)
            bf.append(lo + int(np.argmax(oenv[lo:hi])) if hi > lo else c * CO)
        bf = np.asarray(sorted(set(bf)), dtype=int)
        bf = bf[bf < n]
        if len(bf) < 40:
            return {"error": "too few beats (%d)" % len(bf)}

        def strength(frames):
            fr = np.clip(frames, 1, n - 2)
            o = np.maximum.reduce([oenv[fr - 1], oenv[fr], oenv[fr + 1]])
            l = np.maximum.reduce([lflux[fr - 1], lflux[fr], lflux[fr + 1]])
            zo = (o - np.median(oenv)) / (np.std(oenv) + 1e-9)
            zl = (l - np.median(lflux)) / (np.std(lflux) + 1e-9)
            return zo + zl

        note = ""
        med = np.median(np.diff(bf))
        bpm = 60 * AR / HOP / med
        if bpm > 215:      # tracker locked to double time: keep the better parity
            a, b = bf[0::2], bf[1::2]
            bf = a if strength(a).sum() >= strength(b).sum() else b
            note = "halved"
        elif bpm < 55:     # half time: insert midpoints
            mid = ((bf[:-1] + bf[1:]) // 2)
            bf = np.sort(np.concatenate([bf, mid])); note = "doubled"
        B = bf * HOP / AR                                  # beat times (s)
        bpm = 60 / np.median(np.diff(B))
        bars = 8 if 32 * 60 / bpm <= 14.0 else 4
        N = bars * 4
        if len(B) < N + 8:
            return {"error": "too few beats for window"}

        bs = strength(bf)
        w = np.convolve(bs, np.where(np.arange(33) % 4 == 0, 1.0, 0.0), mode="same")
        sd_w = np.std(w) + 1e-9

        m64 = mono.astype(np.float64)
        cs2 = np.concatenate([[0.0], np.cumsum(m64 * m64)])
        blk = int(0.5 * SR)
        brms = np.sqrt(np.array([(cs2[min(i + blk, len(m64))] - cs2[i]) / blk
                                 for i in range(0, len(m64) - blk, blk)]))
        live = brms[brms > 0.15 * np.median(brms)]
        q75 = float(np.percentile(live if len(live) else brms, 75)) + 1e-9

        cands = []
        for i in range(len(B) - N):
            t0, t1 = B[i], B[i + N]
            if t0 < 0.15 * T or t1 > 0.85 * T:
                continue
            ints = np.diff(B[i:i + N + 1]); mi = np.median(ints)
            if np.max(np.abs(ints - mi)) / mi > 0.22:
                continue
            cv = np.std(ints) / mi
            if cv > 0.09:
                continue
            a, b = int(t0 * SR), int(t1 * SR)
            rms = np.sqrt((cs2[b] - cs2[a]) / (b - a))
            if rms < 0.7 * q75:
                continue
            br = np.array([np.sqrt((cs2[int(B[i + 4 * j + 4] * SR)] - cs2[int(B[i + 4 * j] * SR)]) /
                                   (int(B[i + 4 * j + 4] * SR) - int(B[i + 4 * j] * SR)))
                           for j in range(bars)])
            u = br.min() / (np.median(br) + 1e-9)
            if u < 0.5:
                continue
            four = w[i:i + 4]
            if len(four) < 4 or w[i] < four.max() - 1e-12:
                continue
            second = np.sort(four)[-2]
            pc = 0.5 + 0.5 * float(np.clip((w[i] - second) / sd_w, 0, 1))
            f0, f1 = bf[i], bf[i + N]
            r = float(oenv[bf[i:i + N + 1]].mean() / (oenv[f0:f1].mean() + 1e-9))
            se = float(np.exp(-max(0.0, np.log(q75 / rms)) / 0.25))
            ss_ = float(np.exp(-cv / 0.03))
            sb = float(np.clip((r - 1) / 1.2, 0, 1))
            su = float(np.clip((u - 0.5) / 0.4, 0, 1))
            pre = 0.30 * se + 0.25 * ss_ + 0.20 * sb + 0.15 * pc + 0.10 * su
            cands.append((pre, i, cv, rms / q75, r, pc))
        if not cands:
            return {"error": "no steady full-band window (bpm %.0f)" % bpm}
        cands.sort(reverse=True)
        # distinct windows (not overlapping), up to 8 to refine
        picked = []
        for c in cands:
            if all(abs(c[1] - p[1]) >= N for p in picked):
                picked.append(c)
            if len(picked) >= 8:
                break
        refined = []
        for pre, i, cv, er, r, pc in picked:
            s = fine_onset(mono, int(B[i] * SR)); e0 = fine_onset(mono, int(B[i + N] * SR))
            xf = int(XF_SEC * SR)
            if s < xf + 1300 or e0 + 100 > len(mono):
                continue
            e, corr = refine_end(mono, s, e0)
            sec = (e - s) / SR
            if sec < 3.5 or sec > 17.5:
                continue
            tot = 0.85 * pre + 0.15 * float(np.clip(corr, 0, 1))
            refined.append((tot, s, e, corr, pre, cv, er, r, pc))
        if not refined:
            return {"error": "no refinable window"}
        refined.sort(reverse=True)
        outs = []
        for tot, s, e, corr, pre, cv, er, r, pc in refined[:3]:
            loop = make_loop(y, s, e)
            audio, pre_l, gain = normalize(loop)
            outs.append({"score": float(tot), "s": s, "e": e, "audio": audio, "corr": float(corr),
                         "cv": float(cv), "energy": float(er), "beatconf": float(r), "phase": float(pc),
                         "pre_lufs": pre_l, "gain_db": gain,
                         "bpm": N * 60.0 / ((e - s) / SR), "bars": bars,
                         "start_pct": s / SR / T * 100, "note": note})
        return {"cands": outs, "track_bpm": float(bpm), "duration": T}
    except Exception as ex:  # noqa
        import traceback
        return {"error": "%s: %s" % (type(ex).__name__, ex), "tb": traceback.format_exc()[-600:]}


# ---------------------------------------------------------------- verification
def seam_check(dec):
    """Return click ratio: second-difference at the wrap vs the loudest ordinary spot."""
    n = len(dec)
    k = 2205
    z = np.concatenate([dec[-k:], dec[:k]], axis=0)
    d2 = np.abs(np.diff(z, n=2, axis=0)).max(axis=1)
    c = k - 1
    seam = d2[c - 3:c + 4].max()
    rest = np.concatenate([d2[:c - 40], d2[c + 40:]])
    ref = np.percentile(rest, 99.9) + 1e-6
    # also compare with whole-loop second-difference ceiling
    full = np.abs(np.diff(dec, n=2, axis=0)).max(axis=1)
    ref2 = np.percentile(full, 99.9) + 1e-6
    return float(seam / max(ref, ref2 * 0.5))


def encode_verify(audio, out_path, intended_len):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    gain = 1.0
    for _ in range(3):
        sf.write(str(out_path), audio * gain, SR, format="MP3", bitrate_mode="CONSTANT",
                 compression_level=MP3_LEVEL)
        dec, sr = sf.read(str(out_path), dtype="float32", always_2d=True)
        peak = float(np.abs(dec).max())
        if peak < 10 ** (-1.0 / 20):
            break
        gain *= 10 ** (-(20 * np.log10(peak) + 1.3) / 20)
    res = {"sr": sr, "channels": dec.shape[1], "dur_err_ms": abs(len(dec) - intended_len) / SR * 1000,
           "peak_db": 20 * np.log10(peak + 1e-12), "lufs": lufs(dec), "click": seam_check(dec),
           "kbps": out_path.stat().st_size * 8 / (len(dec) / SR) / 1000}
    res["ok"] = (res["sr"] == SR and res["channels"] == 2 and res["dur_err_ms"] <= 30 and
                 res["peak_db"] < -1.0 and res["click"] < 2.0)
    return res


# ---------------------------------------------------------------- selection + outputs
def artist_key(a):
    parts = re.split(r",|&|\band\b|\bfeat\.?\b|\bwith\b|/|\+", a.lower())
    return {p.strip() for p in parts if p.strip()}


def write_outputs(out_root, data):
    loops_dir = out_root / "assets" / "loops"
    (loops_dir / "loops-data.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    styles = sorted(data)

    # js/content/loops.js
    js = {"base": "assets/loops/", "styles": {}}
    for st in styles:
        # slots 01-08 are for local bands, 09 and up for touring bands (so the two never share a loop)
        js["styles"][st] = [dict({k: e[k] for k in ("file", "bpm", "bars", "seconds", "artist", "title",
                                                    "license", "licenseUrl", "url")},
                                 pool="local" if int(re.search(r"-(\d+)\.mp3$", e["file"]).group(1)) <= LOCAL_SLOTS else "touring")
                            for e in data[st]]
    (out_root / "js" / "content").mkdir(parents=True, exist_ok=True)
    (out_root / "js" / "content" / "loops.js").write_text(
        "// Generated by tools/loopcut.py - do not edit. Each mp3 is a seamless loop (the whole decoded buffer loops).\n"
        "SB.Content.loops = " + json.dumps(js, indent=1, ensure_ascii=False) + ";\n", encoding="utf-8")

    # CREDITS.md
    L = ["# Loop credits", "",
         "Every loop is a 4 or 8 bar excerpt of a Creative Commons track hosted on the Internet Archive,",
         "cut and level-matched by `tools/loopcut.py`. Licences are as listed on the source page; most are",
         "non-commercial and/or share-alike, so check the licence before shipping commercially.", ""]
    for st in styles:
        L += ["## " + st, ""]
        for e in data[st]:
            lic = "[%s](%s)" % (e["license"], e["licenseUrl"]) if e.get("licenseUrl") else e["license"]
            note = ("  \n  Note: " + e["licenseNote"]) if e.get("licenseNote") else ""
            L.append("- `%s` - **%s**, \"%s\" (album: %s) - %s - [source](%s)%s" %
                     (e["file"], e["artist"], e["title"], e.get("album") or "n/a", lic, e["url"], note))
        L.append("")
    (loops_dir / "CREDITS.md").write_text("\n".join(L), encoding="utf-8")

    # review.html
    h = ["<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>",
         "<title>Loop review</title><style>",
         "body{background:#111;color:#ddd;font:14px/1.4 system-ui,sans-serif;margin:0;padding:16px 16px 120px}",
         "h1{font-size:20px}h2{margin:28px 0 8px;border-bottom:1px solid #333;padding-bottom:4px;color:#fff}",
         ".r{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;padding:6px 0;border-bottom:1px solid #222}",
         ".r .n{width:110px;color:#888}.r .m{flex:1 1 260px}.r .m small{color:#888;display:block}",
         "a{color:#8ab4f8}audio{height:32px;width:300px;max-width:100%}label{white-space:nowrap}",
         "textarea{width:100%;height:80px;background:#181818;color:#ddd;border:1px solid #333}",
         "</style><h1>Loop review</h1>",
         "<p>Press play (each loops). Tick the ones that are bad, then copy the list at the bottom.</p>"]
    if any(e.get("new") for st in styles for e in data[st]):
        h.append("<p><label><input type=checkbox id=onlynew checked> show only the NEW loops</label></p>"
                 "<style>body.onlynew .r:not(.new),body.onlynew h2.done{display:none}</style>")
    for st in styles:
        h.append("<h2%s>%s <small style='color:#888;font-weight:normal'>(%d)</small></h2>" %
                 ("" if any(e.get("new") for e in data[st]) else " class=done", html.escape(st), len(data[st])))
        for e in data[st]:
            lic = html.escape(e["license"])
            if e.get("licenseUrl"):
                lic = "<a href='%s' target=_blank>%s</a>" % (html.escape(e["licenseUrl"]), lic)
            cls, tag = (" new", "<b style='color:#f5c542'>NEW </b>") if e.get("new") else ("", "")
            h.append(("<div class='r" + cls + "'><span class=n>" + tag + "%s<br>%d bpm &middot; %d bars &middot; %.1fs</span>"
                     "<audio loop controls preload=none src='%s'></audio>"
                     "<span class=m>%s &mdash; %s<small>%s &middot; <a href='%s' target=_blank>source</a></small></span>"
                     "<label><input type=checkbox class=f data-f='%s'> bad</label></div>" %
                     (html.escape(e["file"].split("/")[-1]), e["bpm"], e["bars"], e["seconds"],
                      html.escape(e["file"]), html.escape(e["artist"]), html.escape(e["title"]), lic,
                      html.escape(e["url"]), html.escape(e["file"]))))
    h.append("<h2>Flagged</h2><textarea id=o readonly></textarea><script>"
             "var o=document.getElementById('o');document.addEventListener('change',function(){"
             "o.value=[].map.call(document.querySelectorAll('.f:checked'),function(c){return c.dataset.f}).join('\\n')});"
             "document.addEventListener('play',function(e){document.querySelectorAll('audio').forEach(function(a){"
             "if(a!==e.target)a.pause()})},true);"
             "var on=document.getElementById('onlynew');function f(){document.body.classList.toggle('onlynew',!!(on&&on.checked))}"
             "if(on){on.addEventListener('change',f);f()}</script>")
    (loops_dir / "review.html").write_text("\n".join(h), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--raw", default=os.environ.get("LOOPS_RAW", DEFAULT_RAW))
    ap.add_argument("--out", default=str(ROOT))
    ap.add_argument("--styles", default="")
    ap.add_argument("--jobs", type=int, default=1)  # keep 1: each worker holds whole decoded songs; 11 workers crashed a 16 GB Mac
    ap.add_argument("--per-style", type=int, default=15)
    ap.add_argument("--clear-new", action="store_true", help="with --refill: forget which loops are NEW (after a review)")
    ap.add_argument("--refill", action="store_true",
                    help="keep every existing loop whose source is not in <raw>/<style>/rejected.json; cut only the empty slots")
    a = ap.parse_args()
    raw = Path(a.raw); out_root = Path(a.out)
    loops_dir = out_root / "assets" / "loops"
    styles = [s for s in a.styles.split(",") if s] or sorted(p.name for p in raw.iterdir()
                                                             if (p / "manifest.json").exists())
    data_path = loops_dir / "loops-data.json"
    data = json.loads(data_path.read_text(encoding="utf-8")) if data_path.exists() else {}

    import gc
    report = {}
    for st in styles:
        # one style at a time, one track at a time, so only one style's candidate loops are ever in memory
        man = json.loads((raw / st / "manifest.json").read_text(encoding="utf-8"))
        rj = raw / st / "rejected.json"   # source files the user flagged as bad (or that are off-style): never used
        rejected = set(json.loads(rj.read_text(encoding="utf-8"))) if rj.exists() else set()
        keep = []
        if a.refill:
            keep = [dict(e) for e in data.get(st, []) if e["source"] not in rejected
                    and (loops_dir / e["file"]).exists()]
            if a.clear_new:   # the user has reviewed everything: drop the NEW marks
                for e in keep:
                    e.pop("new", None)
        kept_src = {e["source"] for e in keep}
        # unlicensed.json: tracks whose CC label was put on by a third-party uploader, not the band or label. Approved loops
        # already cut from them are kept (marked in CREDITS), but they are never picked for a new slot.
        ul = raw / st / "unlicensed.json"
        unlicensed = set(json.loads(ul.read_text(encoding="utf-8"))) if ul.exists() else set()
        UNCONFIRMED = ("License unconfirmed: the CC label on archive.org was applied by a third-party uploader, "
                       "not the band or label. Replace before any public release.")
        for e in keep:
            if e["source"] in unlicensed:
                e["licenseNote"] = UNCONFIRMED
        man = [m for m in man if m["file"] not in rejected and m["file"] not in kept_src and m["file"] not in unlicensed]
        if a.refill and len(keep) >= a.per_style:
            man = []
        rows = []
        if a.jobs > 1:
            with ProcessPoolExecutor(min(a.jobs, 2)) as ex:
                futs = [(m, ex.submit(analyze, raw / st / m["file"], st)) for m in man if (raw / st / m["file"]).exists()]
                for m, fut in futs:
                    rows.append((m, fut.result()))
        else:
            for m in man:
                p = raw / st / m["file"]
                if p.exists():
                    rows.append((m, analyze(p, st)))
                    gc.collect()
        for m, r in rows:
            sys.stderr.write("[%s] %s %s\n" % (st, m["file"], r.get("error", "ok")))
        usable = [(m, r) for m, r in rows if "cands" in r]
        failed = ["%s %s (%s)" % (m["file"], m["artist"], r["error"]) for m, r in rows if "error" in r]
        usable.sort(key=lambda mr: -mr[1]["cands"][0]["score"])
        sdir = loops_dir / st
        sdir.mkdir(parents=True, exist_ok=True)
        keep_files = {e["file"].split("/")[-1] for e in keep}
        for f in sdir.glob("*.mp3"):
            if f.name not in keep_files:
                f.unlink()
        free = [k for k in range(1, a.per_style + 1) if "%s-%02d.mp3" % (st, k) not in keep_files]
        def pool_of(k):
            return "local" if k <= LOCAL_SLOTS else "touring"
        def slot_of(e):
            return int(re.search(r"-(\d+)\.mp3$", e["file"]).group(1))
        chosen = list(keep)
        used = [(pool_of(slot_of(e)), artist_key(e["artist"])) for e in keep]   # one loop per artist per pool
        rejects = []
        for m, r in usable:
            if len(chosen) >= a.per_style or not free:
                break
            keys = artist_key(m["artist"])
            fits = [k for k in free if not any(pl == pool_of(k) and (keys & u) for pl, u in used)]
            if not fits:
                continue
            ok = None
            slot = fits[0]
            for c in r["cands"]:
                tmp = sdir / ("%s-%02d.mp3" % (st, slot))
                v = encode_verify(c["audio"], tmp, len(c["audio"]))
                if v["ok"]:
                    ok = (c, v); break
                rejects.append("%s %s: dur %.0fms peak %.1f click %.1f" %
                               (m["file"], m["artist"], v["dur_err_ms"], v["peak_db"], v["click"]))
            if not ok:
                tmp.unlink(missing_ok=True)
                continue
            c, v = ok
            used.append((pool_of(slot), keys))
            free.remove(slot)
            chosen.append({
                "file": "%s/%s-%02d.mp3" % (st, st, slot), "new": bool(a.refill), "bpm": int(round(c["bpm"])),
                "bars": c["bars"], "seconds": round(len(c["audio"]) / SR, 2),
                "artist": m["artist"], "title": m["title"], "album": m.get("album", ""),
                "license": m.get("license", ""), "licenseUrl": m.get("licenseUrl", ""),
                "url": m.get("url", ""), "licenseNote": m.get("licenseNote", ""),
                "score": round(c["score"], 3), "source": m["file"],
                "q": {"start_pct": round(c["start_pct"]), "lufs": round(v["lufs"], 1),
                      "peak_db": round(v["peak_db"], 1), "click": round(v["click"], 2),
                      "dur_err_ms": round(v["dur_err_ms"], 1), "kbps": round(v["kbps"]),
                      "note": c["note"]}})
        chosen.sort(key=lambda e: e["file"])
        data[st] = chosen
        report[st] = {"new": [e["file"] for e in chosen if e.get("new")],"loops": len(chosen), "candidates": len(rows), "failed": failed, "rejects": rejects,
                      "unused_tracks": len(usable) - (len(chosen) - len(keep))}
        sys.stderr.write("[%s] %d loops\n" % (st, len(chosen)))
        del rows, usable; gc.collect()
        write_outputs(out_root, data)   # after every style, so a crash keeps finished styles
    print(json.dumps(report, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    main()
