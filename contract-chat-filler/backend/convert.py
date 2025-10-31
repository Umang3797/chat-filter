import os
import subprocess
import tempfile

def doc_to_docx(path: str) -> str:
    outdir = tempfile.mkdtemp()
    subprocess.check_call(["soffice", "--headless", "--convert-to", "docx", "--outdir", outdir, path])
    base = os.path.splitext(os.path.basename(path))[0]
    return os.path.join(outdir, base + ".docx")

def docx_to_pdf(path: str) -> str:
    outdir = tempfile.mkdtemp()
    subprocess.check_call(["soffice", "--headless", "--convert-to", "pdf", "--outdir", outdir, path])
    base = os.path.splitext(os.path.basename(path))[0]
    return os.path.join(outdir, base + ".pdf")
