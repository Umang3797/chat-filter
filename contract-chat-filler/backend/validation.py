import re
from datetime import datetime

MONEY_RE = re.compile(r"^\$?\s*([0-9]{1,3}(?:,[0-9]{3})*|[0-9]+)(?:\.[0-9]{1,2})?$")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

def validate_and_normalize(vtype: str, value: str):
    s = (value or "").strip()
    if vtype == "money":
        s = s.replace(" ", "")
        m = MONEY_RE.match(s)
        if not m:
            return False, value, "Enter a valid amount like 250000 or $250,000.00"
        digits = s.replace("$", "")
        try:
            amt = float(digits.replace(",", ""))
            return True, f"${amt:,.2f}", None
        except Exception:
            return False, value, "Could not parse amount"
    elif vtype == "date":
        for fmt in ("%Y-%m-%d", "%B %d, %Y", "%b %d, %Y"):
            try:
                dt = datetime.strptime(s, fmt)
                return True, dt.strftime("%B %d, %Y"), None
            except Exception:
                pass
        return False, value, "Use YYYY-MM-DD or Month DD, YYYY"
    elif vtype == "email":
        if not EMAIL_RE.match(s):
            return False, value, "Enter a valid email address"
        return True, s, None
    else:
        return True, s, None
