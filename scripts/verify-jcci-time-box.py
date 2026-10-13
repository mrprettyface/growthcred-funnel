#!/usr/bin/env python3
"""Check that the import master faithfully contains the JCCI slide copy."""

from pathlib import Path
import re
from xml.etree import ElementTree as ET
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/presentations/jcci-time-box/slide-text.md"
DECK = ROOT / "artifacts/jcci-time-box/jcci-time-box-master.pptx"


def source_slides():
    section = None
    slides = []
    for raw in SOURCE.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if line.startswith("## "):
            section = line[3:]
        elif section and line and not line.startswith("#"):
            slides.append(line)
    return slides


def presentation_slides():
    with ZipFile(DECK) as archive:
        names = [
            name for name in archive.namelist()
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)
        ]
        names.sort(key=lambda name: int(re.search(r"slide(\d+)\.xml", name).group(1)))
        namespace = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
        return [
            "\n".join(node.text or "" for node in ET.fromstring(archive.read(name)).iter(f"{namespace}t"))
            for name in names
        ]


def validate(lines, slides):
    assert len(lines) == 500, f"source has {len(lines)} slides, not 500"
    assert len(slides) == len(lines), f"deck has {len(slides)} slides"
    assert sum(line.startswith("{") and line.endswith("}") for line in lines) >= 20
    assert "R25,000 per seat." in "\n".join(lines)
    assert not re.search(r"collection box|law firm|lawyer|attorney", "\n".join(lines), re.I)

    for number, (expected, text) in enumerate(zip(lines, slides), start=1):
        assert expected in text, f"slide {number} does not contain its source line"
        assert f"{number:03d}" in text, f"slide {number} has no page number"


if __name__ == "__main__":
    validate(source_slides(), presentation_slides())
    print("JCCI Time Box source-to-PowerPoint verification passed")
