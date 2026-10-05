from __future__ import annotations

import re
from dataclasses import dataclass
from io import BytesIO


MAX_DOCUMENT_BYTES = 10 * 1024 * 1024
SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


@dataclass
class ExtractedMetric:
    name: str
    value: str
    status: str
    note: str
    points: int


def extract_text(filename: str, content: bytes) -> str:
    """Extract text without persisting the uploaded medical document."""
    extension = filename.lower().rsplit(".", 1)[-1] if "." in filename else ""
    if extension not in {item.removeprefix(".") for item in SUPPORTED_EXTENSIONS}:
        raise ValueError("Unsupported file type. Upload a PDF, DOCX, TXT, or Markdown file.")
    if len(content) > MAX_DOCUMENT_BYTES:
        raise ValueError("Document is too large. Please upload a file smaller than 10 MB.")

    if extension in {"txt", "md"}:
        text = content.decode("utf-8", errors="replace")
    elif extension == "pdf":
        from pypdf import PdfReader

        reader = PdfReader(BytesIO(content))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    else:
        from docx import Document

        document = Document(BytesIO(content))
        text = "\n".join(paragraph.text for paragraph in document.paragraphs)

    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        raise ValueError("No readable text was found in this document.")
    return text[:30_000]


def _number(text: str, patterns: list[str]) -> float | None:
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            try:
                return float(match.group(1))
            except ValueError:
                return None
    return None


def score_document(text: str) -> tuple[int, str, str, list[ExtractedMetric]]:
    """Create a conservative wellness score from common reported measurements."""
    metrics: list[ExtractedMetric] = []

    bmi = _number(text, [r"\bBMI\s*[:=]?\s*(\d+(?:\.\d+)?)"])
    if bmi is not None:
        status = "within typical range" if 18.5 <= bmi < 25 else "worth discussing"
        points = 20 if status == "within typical range" else 10
        metrics.append(ExtractedMetric("BMI", f"{bmi:g}", status, "BMI is only a screening measure, not a diagnosis.", points))

    systolic = _number(text, [r"(?:blood pressure|BP)[^0-9]{0,12}(\d{2,3})\s*/\s*\d{2,3}"])
    diastolic = _number(text, [r"(?:blood pressure|BP)[^0-9]{0,12}\d{2,3}\s*/\s*(\d{2,3})"])
    if systolic is not None and diastolic is not None:
        normal = systolic < 120 and diastolic < 80
        metrics.append(ExtractedMetric("Blood pressure", f"{systolic:g}/{diastolic:g}", "within typical range" if normal else "worth discussing", "One reading cannot establish a diagnosis.", 20 if normal else 10))

    glucose = _number(text, [r"(?:fasting\s+)?(?:blood\s+)?glucose[^0-9]{0,12}(\d+(?:\.\d+)?)"])
    if glucose is not None:
        normal = glucose < 100
        metrics.append(ExtractedMetric("Glucose", f"{glucose:g}", "within typical range" if normal else "worth discussing", "Interpretation depends on whether the test was fasting.", 20 if normal else 10))

    cholesterol = _number(text, [r"(?:total\s+)?cholesterol[^0-9]{0,12}(\d+(?:\.\d+)?)"])
    if cholesterol is not None:
        normal = cholesterol < 200
        metrics.append(ExtractedMetric("Total cholesterol", f"{cholesterol:g}", "within typical range" if normal else "worth discussing", "Ask a clinician to interpret the full lipid panel.", 20 if normal else 10))

    score = round(sum(metric.points for metric in metrics) / (len(metrics) * 20) * 100) if metrics else 50
    label = "Strong baseline" if score >= 80 else "Room to improve" if score >= 60 else "Needs clinician review"
    summary = (
        f"Found {len(metrics)} commonly reported health metric(s). "
        "This wellness score is an educational summary of extracted values, not a medical assessment."
    )
    return score, label, summary, metrics
