import re
from typing import List, Dict

BRACKETED = re.compile(r"\[(?:(?!\[|\]).)*\]")
BLANKS    = re.compile(r"\$?\[[_\s]+\]")

def normalize_key(s: str) -> str:
    s = s.strip()[1:-1] if s.strip().startswith("[") and s.strip().endswith("]") else s
    s = re.sub(r"[^A-Za-z0-9]+", "_", s).strip("_")
    return s.lower()

def infer_type(key: str) -> str:
    k = key.lower()
    if any(t in k for t in ["price", "amount", "purchase", "cap", "valuation", "dollar"]):
        return "money"
    if any(t in k for t in ["date", "effective", "closing"]):
        return "date"
    if any(t in k for t in ["email", "e-mail"]):
        return "email"
    return "string"

def extract_placeholders_from_text(text: str) -> List[Dict]:
    found = set()
    out: List[Dict] = []
    for m in BRACKETED.finditer(text):
        raw = m.group(0)
        key = normalize_key(raw)
        if key and key not in found:
            found.add(key)
            out.append({"raw": raw, "key": key, "type": infer_type(key)})
    for m in BLANKS.finditer(text):
        raw = m.group(0)
        key = normalize_key(raw) or normalize_key("blank")
        if key not in found:
            found.add(key)
            out.append({"raw": raw, "key": key, "type": "string"})
    return out
