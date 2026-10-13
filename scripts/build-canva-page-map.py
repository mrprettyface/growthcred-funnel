"""Align a user-supplied Canva PDF export to the ordered transcript blocks.

The PDF is an export of the live design's selected pages, not every Canva page.
This script never writes to Canva. It generates reviewable, page-numbered maps.
"""

from __future__ import annotations

import argparse
import csv
import io
import math
import re
import unicodedata
from collections import Counter
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    "/Users/PhilaNgwenya/.codex/attachments/"
    "e677f103-513a-42e5-9723-4f0d70517516/Pasted text.txt"
)
PDF = Path("/Users/PhilaNgwenya/Downloads/Copy of Your paragraph text (3).pdf")
REWRITE = ROOT / "docs/presentations/law-firm-part-1-voice-pass.md"
CSV_OUT = ROOT / "docs/presentations/law-firm-canva-page-map.csv"
MD_OUT = ROOT / "docs/presentations/law-firm-canva-page-map.md"

# Observed in Canva's Download > Select pages UI on 28 September 2026.
EXPORTED_CANVA_PAGES = [*range(1, 53), *range(57, 348), *range(349, 501)]
OMITTED_PAGE_TEXT = {
    53: "Solo Practitioners, who used this kind of automation to handle 37% more cases without hiring a single new employee",
    54: "Small Firms (2 to 4 staff), who used this leverage to achieve double the revenue growth of the industry average",
    55: "Flat-Fee Firms like Estate Planning, who used this to cut drafting time by 40% and immediately increase their profit margins",
    56: "High-Stakes Litigators handling massive mass torts, where the only way to manage thousands of claims is with tech-enabled support",
    348: "and get all of them that contact you... = * wants to enquire about service; instant; * happy to help if you share the best place to contact you",
}


def compact(value: str) -> str:
    ascii_text = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", ascii_text.lower())


def shingles(value: str, size: int = 6) -> set[str]:
    if len(value) < size:
        return {value} if value else set()
    return {value[i : i + size] for i in range(len(value) - size + 1)}


def source_blocks() -> list[str]:
    raw = SOURCE.read_text(encoding="utf-8")
    chunks = re.split(r"(?m)^PDF\s*$", raw)
    blocks = []
    for chunk in chunks:
        chunk = re.sub(r"(?m)^\+\s*\d+\s*$", "", chunk).strip()
        if chunk:
            blocks.append(chunk)
    assert len(blocks) == 203, f"Expected 203 transcript blocks; found {len(blocks)}"
    return blocks


def emission_scores(pages: list[str], blocks: list[str]) -> list[list[float]]:
    page_compact = [compact(value) for value in pages]
    block_compact = [compact(value) for value in blocks]
    page_sets = [shingles(value) for value in page_compact]
    block_sets = [shingles(value) for value in block_compact]
    doc_freq: Counter[str] = Counter()
    for terms in block_sets:
        doc_freq.update(terms)
    weights = {term: math.log((len(blocks) + 1) / (count + 1)) + 1 for term, count in doc_freq.items()}
    result = []
    for p, terms in zip(page_compact, page_sets):
        denom = sum(weights.get(term, 1.0) for term in terms) or 1.0
        row = []
        for b, bterms in zip(block_compact, block_sets):
            coverage = sum(weights.get(term, 1.0) for term in terms & bterms) / denom
            if p and len(p) >= 14 and p in b:
                coverage = max(coverage, 1.0)
            if b and len(b) >= 14 and b in p:
                coverage = max(coverage, 0.9)
            row.append(coverage)
        result.append(row)
    return result


def monotone_alignment(scores: list[list[float]]) -> list[tuple[int, int]]:
    """Align pages and blocks while allowing multiple blocks on one slide.

    A page can show a heading and its first bullet even when the transcript
    extraction put them in separate blocks. Conversely, a block can span
    several staged-build pages. The path permits both cases.
    """
    n_pages = len(scores)
    n_blocks = len(scores[0])
    bad = -1e12
    matrix = [[bad] * n_blocks for _ in range(n_pages)]
    back = [["" for _ in range(n_blocks)] for _ in range(n_pages)]
    for i in range(n_pages):
        for j in range(n_blocks):
            match = scores[i][j] - 0.30
            if i == 0 and j == 0:
                matrix[i][j] = match
                continue
            choices = []
            if i:
                choices.append((matrix[i - 1][j], "page"))
            if j:
                choices.append((matrix[i][j - 1], "block"))
            if i and j:
                choices.append((matrix[i - 1][j - 1], "both"))
            previous, move = max(choices)
            matrix[i][j] = previous + match
            back[i][j] = move
    assert matrix[-1][-1] > bad / 2, "Could not align pages and blocks"
    cells = []
    i, j = n_pages - 1, n_blocks - 1
    while True:
        cells.append((i, j))
        if i == 0 and j == 0:
            break
        move = back[i][j]
        if move in ("page", "both"):
            i -= 1
        if move in ("block", "both"):
            j -= 1
    cells.reverse()
    return cells


def read_rewrite_ids() -> list[int]:
    text = REWRITE.read_text(encoding="utf-8")
    ids = [int(value) for value in re.findall(r"(?m)^### (\d{3})\b", text)]
    assert ids == list(range(1, 204)), "Revised block IDs changed"
    return ids


def generate() -> tuple[list[dict[str, object]], list[dict[str, object]]]:
    blocks = source_blocks()
    read_rewrite_ids()
    reader = PdfReader(PDF)
    assert len(reader.pages) == len(EXPORTED_CANVA_PAGES) == 495
    pages = [page.extract_text() or "" for page in reader.pages]
    scores = emission_scores(pages, blocks)
    alignment = monotone_alignment(scores)
    blocks_by_pdf: dict[int, list[int]] = {i: [] for i in range(len(pages))}
    for pdf_index, block_index in alignment:
        blocks_by_pdf[pdf_index].append(block_index + 1)
    by_canva: dict[int, dict[str, object]] = {}
    for pdf_index, canva_page in enumerate(EXPORTED_CANVA_PAGES):
        assigned = blocks_by_pdf[pdf_index]
        score = min(scores[pdf_index][block - 1] for block in assigned)
        by_canva[canva_page] = {
            "canva_page": canva_page,
            "pdf_page": pdf_index + 1,
            "rewrite_block": ";".join(f"{block:03d}" for block in assigned),
            "match_score": f"{score:.3f}",
            "review": "CHECK" if score < 0.35 else ("MULTI-BLOCK" if len(assigned) > 1 else ""),
            "current_text": " ".join(pages[pdf_index].split()),
        }
    # These five pages were visible in Canva but excluded from the PDF export.
    # Their block membership is based on their live text and neighbouring pages.
    for canva_page, text in OMITTED_PAGE_TEXT.items():
        following = min(page for page in by_canva if page > canva_page)
        block = 42 if canva_page in (53, 54, 55, 56) else int(str(by_canva[following]["rewrite_block"]).split(";")[0])
        by_canva[canva_page] = {
            "canva_page": canva_page,
            "pdf_page": "",
            "rewrite_block": f"{block:03d}",
            "match_score": "live UI",
            "review": "CHECK omitted-page claim" if canva_page != 348 else "CHECK live-only build",
            "current_text": text,
        }
    rows = [by_canva[i] for i in range(1, 501)]
    ranges = []
    for block in range(1, 204):
        pages_for_block = [int(row["canva_page"]) for row in rows if block in [int(value) for value in str(row["rewrite_block"]).split(";")]]
        if not pages_for_block:
            raise AssertionError(f"Block {block:03d} has no Canva page")
        ranges.append(
            {
                "block": f"{block:03d}",
                "first": min(pages_for_block),
                "last": max(pages_for_block),
                "count": len(pages_for_block),
                "checks": sum(row["review"] != "" for row in rows if block in [int(value) for value in str(row["rewrite_block"]).split(";")]),
                "cue": next(str(row["current_text"])[:90] for row in rows if block in [int(value) for value in str(row["rewrite_block"]).split(";")]),
            }
        )
    return rows, ranges


def write_outputs(rows: list[dict[str, object]], ranges: list[dict[str, object]]) -> None:
    CSV_OUT.parent.mkdir(parents=True, exist_ok=True)
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["canva_page", "pdf_page", "rewrite_block", "match_score", "review", "current_text"])
    writer.writeheader()
    writer.writerows(rows)
    CSV_OUT.write_text(output.getvalue(), encoding="utf-8")
    lines = [
        "# Canva page map — law-firm Part 1",
        "",
        "This is a page-number map, **not a record of Canva text being changed**. It maps the revised blocks in [the voice pass](law-firm-part-1-voice-pass.md) to the live 500-page design. The 495-page PDF export excluded Canva pages **53–56 and 348**. Those five pages were read directly in Canva. The CSV has one row for every Canva page, its current text, block ID, and a match score. Low-score rows need visual review before any bulk replacement.",
        "",
        "Do not paste a whole revised block onto every page in its range: several pages are staged builds of one sentence or list. Split the wording to match the existing visual beats. A full stop is a useful cue, not a reliable page boundary in this deck.",
        "",
        "| Revised block | Canva pages | Pages | Review flags | First-page cue |",
        "|---:|---:|---:|---:|---|",
    ]
    for item in ranges:
        span = str(item["first"]) if item["first"] == item["last"] else f'{item["first"]}–{item["last"]}'
        cue = str(item["cue"]).replace("|", "\\|")
        lines.append(f'| [{item["block"]}](law-firm-part-1-voice-pass.md#user-content-{item["block"]}) | {span} | {item["count"]} | {item["checks"]} | {cue} |')
    flagged = [row for row in rows if row["review"]]
    lines += ["", "## Pages to check before editing", "", f"{len(flagged)} of 500 pages are flagged by the mechanical alignment or are live-only PDF omissions. The page-level CSV lists every flag. Check these against Canva's canvas text; do not treat the score as editorial proof.", "", "## Export/page translation", "", "- PDF pages 1–52 → Canva pages 1–52.", "- PDF pages 53–343 → Canva pages 57–347.", "- PDF pages 344–495 → Canva pages 349–500.", "- Canva pages 53–56 and 348 were excluded from the PDF export and inspected in the live editor.", ""]
    MD_OUT.write_text("\n".join(lines), encoding="utf-8")


def verify() -> None:
    with CSV_OUT.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle))
    assert len(rows) == 500
    assert [int(row["canva_page"]) for row in rows] == list(range(1, 501))
    assert [int(row["pdf_page"]) for row in rows if row["pdf_page"]] == list(range(1, 496))
    assert [int(row["canva_page"]) for row in rows if not row["pdf_page"]] == [53, 54, 55, 56, 348]
    assigned = [[int(value) for value in row["rewrite_block"].split(";")] for row in rows]
    assert sorted(set(value for group in assigned for value in group)) == list(range(1, 204))
    assert all(0 <= b[0] - a[-1] <= 1 for a, b in zip(assigned, assigned[1:])), "Non-monotone block map"
    assert all(row["current_text"] for row in rows), "A page has no extracted or live text"
    assert "| [203]" in MD_OUT.read_text(encoding="utf-8")
    print("Canva page-map verification passed")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--verify", action="store_true")
    args = parser.parse_args()
    if args.verify:
        verify()
    else:
        write_outputs(*generate())
        verify()
