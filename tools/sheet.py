#!/usr/bin/env python3
"""tools/sheet.py - a contact sheet of PNG shots: python3 tools/sheet.py OUT.jpg COLS TILE_W shot1.png shot2.png ...
Each tile is the shot scaled to TILE_W wide with its file name under it."""
import sys, os
from PIL import Image, ImageDraw
out, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
files = sys.argv[4:]
th = int(tw * 800 / 1280); lab = 22
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (tw + 8) + 8, rows * (th + lab + 8) + 8), (30, 30, 30))
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB'); im.thumbnail((tw, th))
    x, y = 8 + (i % cols) * (tw + 8), 8 + (i // cols) * (th + lab + 8)
    sheet.paste(im, (x, y)); d.text((x + 2, y + th + 4), os.path.basename(f), fill=(240, 240, 240))
sheet.save(out, quality=82)
print(out, sheet.size)
