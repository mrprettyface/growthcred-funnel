#!/usr/bin/env python3
"""
Site icons from the GrowthCred "GC" mark: a white rounded square with a gold,
bold "GC", the mark the site already used as its SVG favicon.

Why this exists: the site shipped only an SVG favicon whose letters were live
<text> in Arial, and /favicon.ico was a 404. Google shows a grey globe in
search results when it cannot fetch a square raster icon that is a multiple
of 48px, so every size is generated here from one definition.

Needs Pillow and fontTools (pip install pillow fonttools) and the macOS
Arial Bold. Run from the repository root:  python3 scripts/make-icons.py

Writes to public/ (copied to the site root by the build):
  favicon.ico (16, 32, 48)   favicon-48x48.png   favicon-96x96.png
  apple-touch-icon.png (180, opaque)   icon-192.png   icon-512.png
  images/growthcred-mark.svg (letters as paths, no font needed)
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
WHITE, EDGE, GOLD = "#ffffff", "#e8e0d0", "#b8923c"
BOX = 128          # design units, as in the original SVG
RADIUS = 24
LETTER_H = 44      # cap height of "GC" in design units (the old font-size 56)
OUT = Path("public")


def glyph_paths():
    """ "GC" as one SVG path, scaled to LETTER_H and centred in the 128 box."""
    font = TTFont(FONT)
    cmap, glyphs = font.getBestCmap(), font.getGlyphSet()
    names = [cmap[ord(c)] for c in "GC"]

    # Lay the two glyphs out on their advances, measure, then centre.
    bounds = BoundsPen(glyphs)
    x = 0
    for name in names:
        glyphs[name].draw(TransformPen(bounds, (1, 0, 0, 1, x, 0)))
        x += glyphs[name].width
    xmin, ymin, xmax, ymax = bounds.bounds
    scale = LETTER_H / (ymax - ymin)
    width = (xmax - xmin) * scale
    tx = (BOX - width) / 2 - xmin * scale
    ty = (BOX + LETTER_H) / 2 + ymin * scale  # font y points up, SVG y points down

    pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    x = 0
    for name in names:
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, tx + x * scale, ty)))
        x += glyphs[name].width
    return pen.getCommands()


def write_svg():
    d = glyph_paths()
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}">'
        f'<rect x="1" y="1" width="126" height="126" rx="{RADIUS}" fill="{WHITE}" stroke="{EDGE}" stroke-width="2"/>'
        f'<path fill="{GOLD}" d="{d}"/></svg>\n'
    )
    (OUT / "images/growthcred-mark.svg").write_text(svg)


def raster(size, rounded=True):
    """Drawn at 8x and scaled down, so small sizes stay crisp."""
    big = size * 8
    k = big / BOX
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if rounded:
        draw.rounded_rectangle([k, k, big - k, big - k], radius=RADIUS * k, fill=WHITE, outline=EDGE, width=max(1, round(2 * k)))
    else:
        draw.rectangle([0, 0, big, big], fill=WHITE)

    # Size the font so the capitals are LETTER_H tall, then centre the ink box.
    probe = ImageFont.truetype(FONT, 1000)
    l, t, r, b = probe.getbbox("GC")
    font = ImageFont.truetype(FONT, round(1000 * LETTER_H * k / (b - t)))
    l, t, r, b = draw.textbbox((0, 0), "GC", font=font)
    draw.text(((big - (r - l)) / 2 - l, (big - (b - t)) / 2 - t), "GC", font=font, fill=GOLD)
    return img.resize((size, size), Image.LANCZOS)


def main():
    write_svg()
    for size in (48, 96):
        raster(size).save(OUT / f"favicon-{size}x{size}.png", optimize=True)
    for size in (192, 512):
        raster(size).save(OUT / f"icon-{size}.png", optimize=True)
    # iOS fills transparency with black, so the touch icon is a full white square.
    raster(180, rounded=False).convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
    raster(256).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("icons written: favicon.ico, favicon-48x48.png, favicon-96x96.png, apple-touch-icon.png, icon-192.png, icon-512.png, images/growthcred-mark.svg")


if __name__ == "__main__":
    main()
