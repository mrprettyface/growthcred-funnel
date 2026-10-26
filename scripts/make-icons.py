#!/usr/bin/env python3
"""
Site icons from the GrowthCred "G." mark: a cream G and a gold full stop on a
midnight tile, the ending of the "GrowthCred." wordmark. Phila chose it on
23 Oct 2026 to replace the gold Arial "GC" on white.

Why this exists: Google shows a grey globe in search results when it cannot
fetch a square raster icon that is a multiple of 48px, so every size is
generated here from one definition. The letters are Manrope 800, the site's
headline face, read from the copy the site already installs.

Needs Pillow, fontTools, Brotli and uharfbuzz
(pip install pillow fonttools brotli uharfbuzz) and node_modules (npm ci).
Run from the repository root:  python3 scripts/make-icons.py

Writes to public/ (copied to the site root by the build):
  favicon.ico (16, 32, 48)   favicon-48x48.png   favicon-96x96.png
  apple-touch-icon.png (180, opaque)   icon-192.png   icon-512.png
  images/growthcred-mark.svg (letters as paths, no font needed)
"""
from io import BytesIO
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageDraw, ImageFont

FONT = "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"
MIDNIGHT, CREAM, GOLD = "#1a1a24", "#e8e0d0", "#c8a04a"
TEXT, COLOURS = "G.", (CREAM, GOLD)
BOX = 512          # design units
RADIUS = 112       # about the corner phone launchers cut anyway
LETTER_H = 270     # ink height of the G
TRACK = -0.05      # em, the wordmark's letter-spacing
NUDGE = 6          # the full stop is light, so the pair sits a touch right of centre
OUT = Path("public")


def load_font():
    """Manrope at weight 800, plus the same font as TrueType bytes for Pillow and HarfBuzz."""
    font = instancer.instantiateVariableFont(TTFont(FONT), {"wght": 800})
    font.flavor = None
    data = BytesIO()
    font.save(data)
    return font, data.getvalue()


def layout(font, data):
    """Each glyph's name and pen x in font units, and how to place them in the box.

    Shaped with HarfBuzz so the kern between the G and the full stop matches the
    browser, then tracked like the wordmark. The G's ink is LETTER_H tall and
    centred vertically; the ink of the pair is centred across.
    """
    buf = hb.Buffer()
    buf.add_str(TEXT)
    buf.guess_segment_properties()
    hb.shape(hb.Font(hb.Face(data)), buf, {"kern": True})
    upem = font["head"].unitsPerEm
    placed, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        placed.append((font.getGlyphName(info.codepoint), x + pos.x_offset))
        x += pos.x_advance + TRACK * upem

    glyphs = font.getGlyphSet()

    def ink(run):
        bounds = BoundsPen(glyphs)
        for name, gx in run:
            glyphs[name].draw(TransformPen(bounds, (1, 0, 0, 1, gx, 0)))
        return bounds.bounds

    _, g_bottom, _, g_top = ink(placed[:1])
    left, _, right, _ = ink(placed)
    scale = LETTER_H / (g_top - g_bottom)
    tx = BOX / 2 - (left + right) / 2 * scale + NUDGE
    ty = BOX / 2 + (g_bottom + g_top) / 2 * scale  # font y points up, SVG y points down
    return placed, scale, tx, ty


def write_svg(font, placed, scale, tx, ty):
    glyphs = font.getGlyphSet()
    paths = []
    for (name, gx), colour in zip(placed, COLOURS):
        pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, tx + gx * scale, ty)))
        paths.append(f'<path fill="{colour}" d="{pen.getCommands()}"/>')
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}">'
        f'<rect width="{BOX}" height="{BOX}" rx="{RADIUS}" fill="{MIDNIGHT}"/>'
        + "".join(paths)
        + "</svg>\n"
    )
    (OUT / "images/growthcred-mark.svg").write_text(svg)


def raster(font, data, layout_, size, rounded=True):
    """Drawn at 8x and scaled down, so small sizes stay crisp."""
    placed, scale, tx, ty = layout_
    big = size * 8
    k = big / BOX
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if rounded:
        draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=RADIUS * k, fill=MIDNIGHT)
    else:
        draw.rectangle([0, 0, big, big], fill=MIDNIGHT)

    # One em of the font is unitsPerEm font units, so this is the em in pixels.
    face = ImageFont.truetype(BytesIO(data), font["head"].unitsPerEm * scale * k)
    for char, (_, gx), colour in zip(TEXT, placed, COLOURS):
        draw.text(((tx + gx * scale) * k, ty * k), char, font=face, fill=colour, anchor="ls")
    return img.resize((size, size), Image.LANCZOS)


def main():
    font, data = load_font()
    placement = layout(font, data)
    write_svg(font, *placement)
    for size in (48, 96):
        raster(font, data, placement, size).save(OUT / f"favicon-{size}x{size}.png", optimize=True)
    for size in (192, 512):
        raster(font, data, placement, size).save(OUT / f"icon-{size}.png", optimize=True)
    # iOS fills transparency with black and rounds the corners itself, so the
    # touch icon is a full midnight square.
    raster(font, data, placement, 180, rounded=False).convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
    raster(font, data, placement, 256).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("icons written: favicon.ico, favicon-48x48.png, favicon-96x96.png, apple-touch-icon.png, icon-192.png, icon-512.png, images/growthcred-mark.svg")


if __name__ == "__main__":
    main()
