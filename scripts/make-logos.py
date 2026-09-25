#!/usr/bin/env python3
"""
Client logos, redrawn in the site's own ink.

Clients' logos arrive in every colour and shape. Shown as supplied, a strip of
them reads as eight brands shouting; shown in one colour at one optical size,
it reads as one sentence: "these organisations work with us". So every logo is
turned into a single-colour silhouette (midnight, #1a1a24) with transparency,
trimmed, and given a display size that balances its visual weight against the
others.

Originals (as Phila supplied them, 25 Sep 2026) live in content/client-logos/.
Needs Pillow. Run from the repository root:  python3 scripts/make-logos.py

Writes public/images/clients/<slug>.png and src/content/clientLogos.json.
"""
import json
import math
from pathlib import Path

from PIL import Image, ImageChops

SRC = Path("content/client-logos")
OUT = Path("public/images/clients")
MANIFEST = Path("src/content/clientLogos.json")
INK = (26, 26, 36)          # --color-midnight
HEIGHT = 144                # stored height: 3x the tallest display size
AREA = 40 * 40 * 3.2        # display area in CSS px² a logo is balanced to

# In the order the strip shows them. `nudge` corrects for how heavy or light a
# mark's strokes are, which area alone does not capture.
LOGOS = [
    {"slug": "wework", "name": "WeWork", "nudge": 0.9},
    {"slug": "taiascend", "name": "TaiAscend", "nudge": 1.0},
    {"slug": "mne-waste", "name": "MNE Waste Management", "nudge": 1.05},
    {"slug": "melsoft-academy", "name": "Melsoft Academy", "nudge": 1.0},
    {"slug": "lombia", "name": "Lombia Johannesburg", "nudge": 1.0},
    {"slug": "mpilotech", "name": "MpiloTech", "nudge": 1.0},
]


def ink_alpha(img: Image.Image) -> Image.Image:
    """How far each pixel is from the white page: dark and saturated both count."""
    rgb = img.convert("RGB")
    r, g, b = rgb.split()
    darkest = ImageChops.darker(ImageChops.darker(r, g), b)
    # 255 - min(r, g, b), full ink from 55 down; the faintest haze is dropped.
    return darkest.point(lambda v: 0 if v > 244 else min(255, round((255 - v) * 255 / 200)))


def trim(alpha: Image.Image, pad: int = 2) -> tuple[int, int, int, int]:
    box = alpha.point(lambda v: 255 if v > 12 else 0).getbbox()
    l, t, r, b = box
    return max(0, l - pad), max(0, t - pad), min(alpha.width, r + pad), min(alpha.height, b + pad)


def mpilotech_lockup(alpha: Image.Image) -> Image.Image:
    """MpiloTech is supplied stacked (mark above name); at strip size the name
    would be unreadable, so the mark is set beside the name instead."""
    mark = alpha.crop(trim(alpha.crop((0, 0, alpha.width, 700))))
    word = alpha.crop((0, 700, alpha.width, alpha.height))
    word = word.crop(trim(word))
    mark = mark.resize((round(mark.width * word.height * 1.9 / mark.height), round(word.height * 1.9)), Image.LANCZOS)
    gap = round(word.height * 0.55)
    out = Image.new("L", (mark.width + gap + word.width, mark.height), 0)
    out.paste(mark, (0, 0))
    out.paste(word, (mark.width + gap, (mark.height - word.height) // 2))
    return out


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for logo in LOGOS:
        alpha = ink_alpha(Image.open(SRC / f"{logo['slug']}.png"))
        alpha = mpilotech_lockup(alpha) if logo["slug"] == "mpilotech" else alpha.crop(trim(alpha))
        width = round(alpha.width * HEIGHT / alpha.height)
        alpha = alpha.resize((width, HEIGHT), Image.LANCZOS)

        out = Image.new("RGBA", alpha.size, INK + (0,))
        out.putalpha(alpha)
        out.save(OUT / f"{logo['slug']}.png", optimize=True)

        aspect = width / HEIGHT
        display_h = max(20, min(48, math.sqrt(AREA / aspect) * logo["nudge"]))
        manifest.append(
            {
                "slug": logo["slug"],
                "name": logo["name"],
                "src": f"/images/clients/{logo['slug']}.png",
                "width": width,
                "height": HEIGHT,
                "displayHeight": round(display_h),
            }
        )
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"logos written: {len(manifest)} to {OUT}, manifest {MANIFEST}")


if __name__ == "__main__":
    main()
