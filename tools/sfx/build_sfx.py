#!/usr/bin/env python3
"""Scene Booker — tools/sfx/build_sfx.py
Builds assets/sfx/sfx-data.js: every sound effect as a mono 16-bit WAV, base64'd into one script so it loads from
file:// as well as over http. Sources:
  * real recordings from Kenney's CC0 packs (rpg-audio, impact-sounds, casino-audio, ui-audio), downloaded into the
    folder given as the first argument (each pack unzipped into its own subfolder, as kenney.nl ships them)
  * a few things those packs lack, synthesized here from physical behaviour rather than from tones: a paper tear,
    a ballpoint scribble, an eraser, a phone vibrating on a wooden desk, phone keypad beeps (real phones synthesize
    these too), cassette hiss.
Each recording is trimmed to its first transient (2 ms pre-roll), faded at the tail, and levelled to the same RMS so
the runtime gain table in js/audio/sfx.js is the only place loudness is set.

usage: python3 -I tools/sfx/build_sfx.py <kenney packs dir>
"""
import base64, glob, io, json, os, sys
import numpy as np
import soundfile as sf
from scipy import signal

SR = 44100
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'assets', 'sfx', 'sfx-data.js')
SRC = sys.argv[1] if len(sys.argv) > 1 else None

# pool name -> list of (pack/file stem, max length in ms or None)
POOLS = {
    # a press on a label-maker strip / a paper button: small real mechanical clicks
    'tap':        [('ui-audio/click1', None), ('ui-audio/click2', None), ('ui-audio/click3', None), ('ui-audio/click5', None)],
    # a heavier switch: the tape deck keys, the lamp, settings toggles
    'switch':     [('ui-audio/switch11', None), ('ui-audio/switch22', None), ('ui-audio/switch24', None), ('ui-audio/switch27', None),
                   ('ui-audio/switch28', None), ('ui-audio/switch30', None)],
    # the door clicker: press and spring back
    'tally':      [('rpg-audio/metalClick', None), ('ui-audio/switch33', None), ('ui-audio/switch38', None)],
    # paper lifted / slid across the table
    'slide':      [('casino-audio/card-slide-%d' % i, 420) for i in range(1, 9)],
    # paper set down
    'place':      [('casino-audio/card-place-%d' % i, 380) for i in range(1, 5)] + [('rpg-audio/bookPlace%d' % i, None) for i in (1, 2, 3)],
    # a page turned
    'flip':       [('rpg-audio/bookFlip%d' % i, None) for i in (1, 2, 3)],
    'fan':        [('casino-audio/card-fan-1', None), ('casino-audio/card-fan-2', None), ('casino-audio/cards-pack-open-1', None),
                   ('casino-audio/cards-pack-open-2', None)],
    'bookOpen':   [('rpg-audio/bookOpen', None)],
    'bookClose':  [('rpg-audio/bookClose', None)],
    'coins':      [('rpg-audio/handleCoins', None), ('rpg-audio/handleCoins2', None)],
    'leather':    [('rpg-audio/handleSmallLeather', None), ('rpg-audio/handleSmallLeather2', None)],
    'cloth':      [('rpg-audio/cloth%d' % i, None) for i in (1, 2, 3, 4)],
    'belt':       [('rpg-audio/clothBelt', None), ('rpg-audio/clothBelt2', None), ('rpg-audio/beltHandle1', None)],
    'latch':      [('rpg-audio/metalLatch', None)],
    'keys':       [('impact-sounds/impactMetal_light_00%d' % i, None) for i in range(5)],
    'doorOpen':   [('rpg-audio/doorOpen_1', None), ('rpg-audio/doorOpen_2', None)],
    'doorClose':  [('rpg-audio/doorClose_%d' % i, None) for i in (1, 2, 3, 4)],
    'creak':      [('rpg-audio/creak%d' % i, None) for i in (1, 2, 3)],
    'thudSoft':   [('impact-sounds/impactSoft_medium_00%d' % i, None) for i in range(5)],
    'thudHeavy':  [('impact-sounds/impactSoft_heavy_00%d' % i, 380) for i in range(5)],
    'wood':       [('impact-sounds/impactWood_light_00%d' % i, None) for i in range(5)],
    'plastic':    [('impact-sounds/impactGeneric_light_00%d' % i, None) for i in range(5)],
    'ceramic':    [('impact-sounds/impactPlate_light_00%d' % i, 420) for i in range(5)],
    'step':       [('impact-sounds/footstep_wood_00%d' % i, None) for i in range(5)],
    'chips':      [('casino-audio/chips-stack-%d' % i, None) for i in range(1, 7)],
}


def load(stem):
    hits = glob.glob(os.path.join(SRC, stem.split('/')[0], '**', stem.split('/')[1] + '.ogg'), recursive=True)
    if not hits: raise SystemExit('missing source: ' + stem)
    x, sr = sf.read(hits[0], always_2d=True)
    m = x.mean(1)
    if sr != SR: m = signal.resample_poly(m, SR, sr)
    return m


def trim(m, max_ms=None):
    pk = np.abs(m).max() + 1e-12
    a = int(np.argmax(np.abs(m) > pk * 0.04))
    a = max(0, a - int(SR * 0.002))
    act = np.abs(m) > pk * 0.004
    b = len(m) - int(np.argmax(act[::-1]))
    b = min(len(m), b + int(SR * 0.02))
    if max_ms: b = min(b, a + int(SR * max_ms / 1000))
    y = m[a:b].copy()
    y -= np.mean(y[: max(1, int(SR * 0.002))]) * 0  # keep DC as is; sources are clean
    fi = min(len(y), int(SR * 0.0015)); y[:fi] *= np.linspace(0, 1, fi)  # no click at the cut
    fo = min(len(y), int(SR * (0.04 if len(y) > SR * 0.2 else 0.012)))
    y[-fo:] *= np.linspace(1, 0, fo) ** 2
    return y


def level(y, rms_db=-20.0, ceil_db=-1.0):
    pk = np.abs(y).max() + 1e-12
    env = np.abs(y) > pk * 0.05
    act = y[env] if env.sum() > 32 else y
    rms = np.sqrt(np.mean(act ** 2)) + 1e-12
    g = 10 ** (rms_db / 20) / rms
    g = min(g, 10 ** (ceil_db / 20) / pk)
    return y * g


# ---------------------------------------------------------------- synthesis (things the packs do not have)

def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo / (SR / 2), hi / (SR / 2)], btype='band', output='sos')
    return signal.sosfilt(sos, x)


def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f / (SR / 2), output='sos'), x)


def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f / (SR / 2), btype='high', output='sos'), x)


def smooth_noise(rng, n, rate_hz):
    k = max(2, int(n * rate_hz / SR) + 2)
    pts = rng.normal(size=k)
    return np.interp(np.linspace(0, k - 1, n), np.arange(k), pts)


def tear(seed, dur):
    """Paper tearing: fibres parting one after another, so a dense run of tiny noise bursts whose rate follows how hard
    the hands pull, plus the low flutter of the sheet itself, ending on the snap of the last fibres."""
    rng = np.random.default_rng(seed)
    n = int(SR * dur)
    t = np.arange(n) / SR
    pull = np.clip(t / 0.03, 0, 1) * (1 - np.clip((t - dur + 0.05) / 0.05, 0, 1))
    pull = pull * (1 + 0.45 * smooth_noise(rng, n, 18))
    rate = 2600 * np.clip(pull, 0, None)
    out = np.zeros(n + 400)
    for i in np.nonzero(rng.random(n) < rate / SR)[0]:
        L = int(rng.integers(12, 90))
        burst = rng.normal(size=L) * np.exp(-np.arange(L) / (L / 3.5))
        out[i:i + L] += burst * rng.lognormal(0, 0.7) * pull[i]
    out = out[:n]
    crack = bp(out, 1100, 9500) + 0.35 * bp(out, 350, 1100)
    sheet = lp(rng.normal(size=n), 900) * np.clip(pull, 0, None) * 0.12
    y = crack + sheet
    s = int(n - SR * 0.03)
    L = int(SR * 0.012)
    y[s:s + L] += bp(rng.normal(size=L) * np.exp(-np.arange(L) / (L / 5)), 1500, 8000) * 3.0
    return y


def scribble(seed, strokes, kind='pen'):
    """A pen on paper on a desk: strokes, each a swell of friction noise whose brightness follows the pen's speed,
    roughened by the paper's tooth, with a little low thump from the pad under it."""
    rng = np.random.default_rng(seed)
    parts = []
    for k in range(strokes):
        d = rng.uniform(0.055, 0.15) if kind != 'erase' else rng.uniform(0.06, 0.09)
        n = int(SR * d)
        x = np.linspace(0, 1, n)
        vel = np.sin(np.pi * x) ** 0.8
        tooth = 1 + 0.9 * np.abs(hp(rng.normal(size=n), 3000)) * (rng.random(n) < 0.25)
        w = rng.normal(size=n)
        if kind == 'pen':
            fr = bp(w, 2400, 7500) * vel + 0.6 * bp(w, 1200, 2600) * vel ** 2
            pad = lp(rng.normal(size=n), 500) * vel * 0.5
        elif kind == 'marker':
            fr = bp(w, 1500, 5200) * vel + 0.5 * bp(w, 700, 1600) * vel
            pad = lp(rng.normal(size=n), 400) * vel * 0.4
        else:  # erase: rubber dragging, lower and duller
            fr = bp(w, 500, 2400) * vel + 0.3 * bp(w, 2400, 5000) * vel
            pad = lp(rng.normal(size=n), 300) * vel * 0.8
        parts.append((fr * tooth + pad) * rng.uniform(0.7, 1.0))
        gap = int(SR * (rng.uniform(0.012, 0.045) if kind != 'erase' else rng.uniform(0.004, 0.012)))
        parts.append(np.zeros(gap))
    return np.concatenate(parts)


def buzz(seed, pulses=2):
    """A phone vibrating face down on a wooden desk: an off-balance motor spinning up to ~170 Hz, hammering the case
    against the wood, so a rich square-ish rattle shaped by the case and desk resonances."""
    rng = np.random.default_rng(seed)
    segs = []
    for p in range(pulses):
        d = 0.42
        n = int(SR * d)
        t = np.arange(n) / SR
        f = 168 + 4 * smooth_noise(rng, n, 6)
        f = f * (0.7 + 0.3 * np.clip(t / 0.05, 0, 1)) * (1 - 0.25 * np.clip((t - d + 0.05) / 0.05, 0, 1))
        ph = 2 * np.pi * np.cumsum(f) / SR
        s = np.sin(ph)
        rattle = np.sign(s) * np.abs(s) ** 0.25
        hits = np.maximum(0, np.sin(ph)) ** 12 * rng.normal(1, 0.25, n)
        body = (0.9 * bp(rattle, 140, 260) + 0.7 * bp(rattle, 330, 520) + 0.45 * bp(rattle, 900, 1400)
                + 0.5 * bp(hits * rng.normal(size=n), 1800, 5000))
        env = np.clip(t / 0.03, 0, 1) * np.clip((d - t) / 0.04, 0, 1)
        segs.append(body * env)
        segs.append(np.zeros(int(SR * 0.16)))
    return np.concatenate(segs)


DTMF = {'1': (697, 1209), '2': (697, 1336), '3': (697, 1477), '4': (770, 1209), '5': (770, 1336), '6': (770, 1477),
        '7': (852, 1209), '8': (852, 1336), '9': (852, 1477), '0': (941, 1336)}


def key(seed, digit):
    """A phone keypad beep as a phone's own tiny speaker plays it: the key's DTMF pair, a click of the key itself,
    a speaker too small for the low end and a little breakup."""
    rng = np.random.default_rng(seed)
    d = 0.085
    n = int(SR * d)
    t = np.arange(n) / SR
    a, b = DTMF[digit]
    tone = np.sin(2 * np.pi * a * t) + np.sin(2 * np.pi * b * t)
    tone = np.tanh(1.6 * tone) / 1.6
    env = np.clip(t / 0.004, 0, 1) * np.clip((d - t) / 0.01, 0, 1)
    tone = hp(tone * env, 650) * 0.6
    tone = bp(tone, 600, 5000)
    L = int(SR * 0.006)
    click = hp(rng.normal(size=L) * np.exp(-np.arange(L) / (L / 4)), 2000) * 0.8
    y = np.zeros(n + int(SR * 0.01))
    y[:L] += click
    y[int(SR * 0.006):int(SR * 0.006) + n] += tone
    return y


def hiss(seed, dur=3.0):
    """Cassette hiss with a trace of the capstan motor, seamless as a loop."""
    rng = np.random.default_rng(seed)
    n = int(SR * dur)
    fade = int(SR * 0.4)
    w = rng.normal(size=n + fade)
    y = hp(w, 1800) * 0.9 + bp(w, 400, 1800) * 0.25
    t = np.arange(n + fade) / SR
    y += lp(rng.normal(size=n + fade), 180) * 0.35 * (1 + 0.3 * np.sin(2 * np.pi * 0.7 * t))
    head = y[:fade]
    tail = y[n:n + fade]
    r = np.linspace(0, 1, fade)
    y = y[:n].copy()
    y[:fade] = head * np.sqrt(r) + tail * np.sqrt(1 - r)
    return y


def to_wav64(y):
    buf = io.BytesIO()
    sf.write(buf, np.clip(y, -1, 1).astype(np.float32), SR, format='WAV', subtype='PCM_16')
    return base64.b64encode(buf.getvalue()).decode('ascii')


def main():
    if not SRC or not os.path.isdir(SRC): raise SystemExit(__doc__)
    clips = {}
    for pool, items in POOLS.items():
        for i, (stem, mx) in enumerate(items):
            clips['%s.%d' % (pool, i)] = level(trim(load(stem), mx))
    for i in range(4): clips['tear.%d' % i] = level(tear(100 + i, [0.34, 0.42, 0.28, 0.5][i]))
    for i in range(2): clips['rip.%d' % i] = level(tear(200 + i, [0.75, 0.9][i]))
    for i in range(4): clips['pen.%d' % i] = level(scribble(300 + i, [2, 3, 4, 3][i], 'pen'))
    for i in range(3): clips['marker.%d' % i] = level(scribble(400 + i, [3, 4, 5][i], 'marker'))
    for i in range(3): clips['tick.%d' % i] = level(scribble(450 + i, 2, 'pen')[: int(SR * 0.22)])
    for i in range(2): clips['erase.%d' % i] = level(scribble(500 + i, 7, 'erase'))
    for i in range(2): clips['buzz.%d' % i] = level(buzz(600 + i))
    for i, dg in enumerate('1357924680'): clips['key.%d' % i] = level(key(700 + i, dg))
    clips['hiss.0'] = level(hiss(800), rms_db=-20)

    data = {k: to_wav64(v) for k, v in clips.items()}
    meta = {k: round(len(v) / SR, 3) for k, v in clips.items()}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w') as f:
        f.write('/* Scene Booker — assets/sfx/sfx-data.js. GENERATED by tools/sfx/build_sfx.py; do not edit by hand.\n'
                ' * Mono 16-bit WAV clips, base64. Recordings: Kenney (kenney.nl), CC0. The rest synthesized by the build script. */\n')
        f.write('window.SB_SFX_DATA = ' + json.dumps({'sr': SR, 'len': meta, 'clips': data}, separators=(',', ':')) + ';\n')
    total = sum(meta.values())
    print('%d clips, %.1f s of audio, %.0f KB -> %s' % (len(clips), total, os.path.getsize(OUT) / 1024, OUT))


if __name__ == '__main__':
    main()
