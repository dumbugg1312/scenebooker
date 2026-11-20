#!/usr/bin/env python3
"""Scene Booker: bring the PUNK_SHOW_* collage kits into assets/cutouts/.

  python3 tools/import_kits.py import   copy, grayscale (alpha kept), resize, neutral ids; write
                                         design/cutout-import/candidates.json and numbered contact sheets
  python3 tools/import_kits.py apply    read design/cutout-import/review/*.json (keep/facing/frame per id),
                                         delete rejects, write js/art/cutouts.js

One image at a time (RAM: see memory note). Sources are only read, never changed.
"""
import glob, json, os, re, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COLLAGE = os.path.expanduser('~/Documents/PROGRAMS/COLLAGE')
OUT = os.path.join(ROOT, 'assets', 'cutouts')
WORK = os.path.join(ROOT, 'design', 'cutout-import')
DROP_FLAGS = {'text', 'neighbour', 'low-res'}
SUB2 = {'tape': ['stamp-01', 'stamp-02', 'stamp-06', 'stamp-10'], 'marker': ['stamp-03', 'stamp-04', 'stamp-05'], 'rubberstamp': ['stamp-07'], 'clicker': ['stamp-08', 'stamp-09'], 'envelope': ['mail-01', 'mail-03', 'mail-04', 'mail-06', 'mail-07', 'mail-10', 'mail-13', 'mail-14', 'mail-22', 'mail-24', 'mail-25'], 'cassette': ['mail-08', 'mail-09', 'mail-15', 'mail-16', 'mail-17', 'mail-18', 'mail-19', 'mail-20', 'mail-21', 'mail-23', 'mail-26'], 'machine': ['phone-01', 'phone-02', 'phone-03', 'phone-08', 'phone-09', 'phone-18', 'phone-19', 'phone-21', 'phone-22', 'phone-23', 'phone-24', 'phone-04', 'phone-05'], 'handset': ['phone-06', 'phone-07', 'phone-10', 'phone-11', 'phone-12', 'phone-13'], 'deskphone': ['phone-14', 'phone-15', 'phone-16', 'phone-17', 'phone-20'], 'named': ['mail-11', 'mail-12'], 'mic': ['mic-01']}   # finer still: what the inbox, the door table and the kitchen floor ask for
SUB = {'amp': ['amp-01', 'amp-02', 'amp-03', 'amp-04', 'amp-08', 'amp-09', 'amp-10', 'amp-12', 'amp-13', 'amp-14', 'amp-15', 'amp-16', 'amp-17'], 'pahead': ['amp-05', 'amp-06', 'amp-07'], 'speaker': ['pa-04', 'pa-07', 'pa-09', 'pa-11', 'pa-12', 'pa-17', 'pa-18'], 'mixer': ['pa-01', 'pa-02', 'pa-05', 'pa-13', 'pa-15', 'pa-16'], 'micstand': ['mic-02', 'mic-03', 'mic-06'], 'drumkit': ['kit-02'], 'cooler': ['furniture-01', 'furniture-03', 'furniture-08', 'furniture-10', 'furniture-11', 'furniture-12', 'furniture-13', 'furniture-17', 'furniture-18'], 'fan': ['furniture-02', 'furniture-05', 'furniture-06', 'furniture-07'], 'chair': ['furniture-04', 'furniture-15', 'furniture-16', 'furniture-20', 'furniture-21'], 'stool': ['furniture-14', 'furniture-19'], 'table': ['furniture-09'], 'sofa': ['couch-02', 'couch-03', 'couch-05', 'couch-08'], 'armchair': ['couch-01', 'couch-06', 'couch-07'], 'bedding': ['couch-04', 'couch-09', 'couch-10', 'couch-11', 'couch-12', 'couch-13']}   # gear and furniture by what it is (scenes ask for a fan, not 'furniture')
NAMED = {'merch-01', 'merch-02', 'merch-03', 'merch-08', 'merch-12', 'merch-13'}   # real band/label names printed on them: role 'named', in no pool

ROLE = {
    'bass': 'bass', 'drummer': 'drums', 'guitarist': 'guitar', 'singer': 'singer', 'singer-guitarist': 'singguitar',
    'odd-instrument': 'odd', 'whole-band': 'band',
    'all-ages-kids': 'kids', 'backs-of-heads': 'back', 'crowd-facing': 'crowd', 'older-heads': 'older',
    'shoulders-climbing': 'crowd', 'stage-divers': 'diver', 'crowd-from-stage': 'room',
    'asleep-lying': 'asleep', 'carrying-gear': 'carrying', 'cops': 'cop', 'landlords-neighbors': 'adult',
    'sitting': 'sitting', 'standing-talking-smoking': 'standing', 'waiting-in-line': 'line',
    'amps-cabinets': 'amp', 'cars-pickups': 'car', 'cases': 'case', 'cash-money': 'cash',
    'coolers-fans-chairs-tables': 'furniture', 'couches-mattresses': 'couch', 'drum-kits-empty': 'kit',
    'mail-tapes': 'mail', 'merch-records-tapes': 'merch', 'mic-stands': 'mic', 'pa-mixers-cables': 'pa',
    'phones': 'phone', 'stamps-clickers-markers-tape': 'stamp', 'vans': 'van',
    'bridges-highways-gas': 'road', 'flyers': 'flyer', 'house-fronts': 'house', 'postcards': 'postcard',
    'storefronts-bar-doors': 'storefront',
}
PEOPLE = {'bass', 'drums', 'guitar', 'singer', 'singguitar', 'odd', 'kids', 'back', 'crowd', 'older', 'diver',
          'asleep', 'carrying', 'cop', 'adult', 'sitting', 'standing', 'line'}
SMALL = {'cash', 'stamp', 'mail', 'phone', 'mic', 'case', 'merch', 'flyer', 'postcard'}   # longest side 700, else 900


def guess_frame(role, text):
    t = text.lower()
    if role == 'drums': return 'kit'
    if role in ('band', 'room', 'road', 'house', 'storefront', 'flyer', 'postcard'): return 'photo'
    if role not in PEOPLE: return 'object'
    if re.search(r'full[- ]?(body|figure|length)|head to (toe|feet)|standing full|full\b', t): return 'full'
    if 'waist' in t or 'hip' in t or 'knee' in t: return 'waist'
    if re.search(r'close|head and shoulders|head-and-shoulders|bust|shoulders up', t): return 'close'
    return 'waist'


def existing():
    """the manifest js/art/cutouts.js holds now, as a list of dicts"""
    src = open(os.path.join(ROOT, 'js', 'art', 'cutouts.js')).read()
    out = []
    for m in re.finditer(r"\{ id: '([^']+)', file: '([^']+)', role: '([^']+)', facing: '([^']+)', frame: '([^']+)', w: (\d+), h: (\d+)(?:, tone: ([\d.]+))? \}", src):
        out.append(dict(id=m[1], file=m[2], role=m[3], facing=m[4], frame=m[5], w=int(m[6]), h=int(m[7]), src='(original 50)',
                        tone=float(m[8]) if m[8] else None))
    return out


def font(n):
    for p in ('/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/System/Library/Fonts/Helvetica.ttc'):
        try: return ImageFont.truetype(p, n)
        except Exception: pass
    return ImageFont.load_default()


def sheets(items, tag, per=40, cols=8, cell=210):
    """numbered contact sheets: each piece on mid grey, its id under it"""
    f = font(15); names = []
    for s in range(0, len(items), per):
        chunk = items[s:s + per]; rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new('RGB', (cols * cell, rows * (cell + 22)), (150, 150, 150))
        d = ImageDraw.Draw(sheet)
        for i, it in enumerate(chunk):
            im = Image.open(os.path.join(ROOT, it['file'])).convert('LA')
            im.thumbnail((cell - 10, cell - 10))
            x, y = (i % cols) * cell, (i // cols) * (cell + 22)
            bg = Image.new('RGBA', im.size, (150, 150, 150, 255)); bg.alpha_composite(im.convert('RGBA'))
            sheet.paste(bg.convert('RGB'), (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
            d.text((x + 6, y + cell), it['id'], fill=(0, 0, 0), font=f)
            im.close()
        name = '%s-%02d.jpg' % (tag, s // per + 1)
        sheet.save(os.path.join(WORK, 'sheets', name), quality=82); names.append(name)
    return names


def do_import():
    os.makedirs(os.path.join(WORK, 'sheets'), exist_ok=True)
    have = existing(); count = {}
    for e in have:
        r = e['id'].rsplit('-', 1)[0]; count[r] = max(count.get(r, 0), int(e['id'].rsplit('-', 1)[1]))
    new, dropped = [], 0
    for kit in ('STAGE', 'CROWD', 'WORLD'):
        base = os.path.join(COLLAGE, 'PUNK_SHOW_%s_KIT' % kit)
        for line in open(os.path.join(base, 'catalog.jsonl')):
            d = json.loads(line)
            flags = set(re.split(r'[ ,]+', d.get('flag') or '')) - {''}
            role = ROLE.get(d.get('sub') or '')
            if not role: print('no role for', d['path']); continue
            if flags & DROP_FLAGS: dropped += 1; continue
            count[role] = count.get(role, 0) + 1
            cid = '%s-%02d' % (role, count[role])
            im = Image.open(os.path.join(base, d['path']))
            im = im.convert('RGBA') if im.mode != 'RGBA' else im
            g = im.convert('L'); a = im.getchannel('A')
            out = Image.merge('LA', (g, a))
            box = out.getchannel('A').getbbox()
            if box: out = out.crop(box)
            lim = 700 if role in SMALL else 900
            out.thumbnail((lim, lim), Image.LANCZOS)
            fn = 'assets/cutouts/%s.png' % cid
            out.save(os.path.join(ROOT, fn), optimize=True)
            new.append(dict(id=cid, file=fn, role=role, facing='back' if role == 'back' else 'front',
                            frame=guess_frame(role, d['desc'] + ' ' + d['tags']), w=out.width, h=out.height,
                            src='%s/%s' % (os.path.basename(base), d['path']), desc=d['desc'], flags=sorted(flags)))
            im.close(); out.close()
    json.dump(new, open(os.path.join(WORK, 'candidates.json'), 'w'), indent=1)
    ppl = [n for n in new if n['role'] in PEOPLE or n['role'] in ('band', 'room')]
    rest = [n for n in new if n not in ppl]
    a = sheets(ppl, 'people'); b = sheets(rest, 'things')
    print('imported', len(new), 'dropped by flag', dropped, '| sheets', len(a), 'people', len(b), 'things')


def tone(path):
    """the photo's mean grey (0 black .. 1 white) over its opaque pixels: night scenes lift dark ones, skip silhouettes"""
    im = Image.open(path).convert('LA'); im.thumbnail((200, 200))
    px = [l for l, a in im.getdata() if a > 128]; im.close()
    return sum(px) / len(px) / 255 if px else 0.5


def do_apply():
    cand = json.load(open(os.path.join(WORK, 'candidates.json')))
    rev = {}
    for p in sorted(glob.glob(os.path.join(WORK, 'review', '*.json'))):
        for r in json.load(open(p)): rev[r['id']] = r
    keep, gone = [], 0
    for c in cand:
        r = rev.get(c['id'])
        if r and r.get('keep') is False:
            try: os.remove(os.path.join(ROOT, c['file']))
            except FileNotFoundError: pass
            gone += 1; continue
        if r:
            for k in ('facing', 'frame'):
                if r.get(k): c[k] = r[k]
        if c['id'] in NAMED: c['role'] = 'named'
        for sr, ids in list(SUB.items()) + list(SUB2.items()):
            if c['id'] in ids: c['role'] = sr
        keep.append(c)
    allc = existing() + keep
    for c in allc:
        if c.get('tone') is None: c['tone'] = tone(os.path.join(ROOT, c['file']))
    lines = ["    { id: '%(id)s', file: '%(file)s', role: '%(role)s', facing: '%(facing)s', frame: '%(frame)s', w: %(w)d, h: %(h)d, tone: %(tone).2f }" % c for c in allc]
    path = os.path.join(ROOT, 'js', 'art', 'cutouts.js'); src = open(path).read()
    head, tail = src.split('  var list = [', 1)[0], src.split('  ];', 1)[1]
    open(path, 'w').write(head + '  var list = [\n' + ',\n'.join(lines) + '\n  ];' + tail)
    unreviewed = [c['id'] for c in cand if c['id'] not in rev]
    print('kept', len(keep), 'rejected', gone, 'unreviewed', len(unreviewed), '| manifest now', len(allc))


if __name__ == '__main__':
    {'import': do_import, 'apply': do_apply}[sys.argv[1] if len(sys.argv) > 1 else 'import']()
