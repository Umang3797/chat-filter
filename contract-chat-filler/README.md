# Contract Chat Filler

Upload `.docx`, `.doc`, or `.pdf`, chat to fill placeholders, and download a filled `.docx` with a live PDF preview.

## Local run (Docker)

```bash
docker build -t contract-chat-filler .
docker run -p 8080:8000 contract-chat-filler
# open http://localhost:8080
```

## Deploy on Render (Docker)

1. Push this folder to a GitHub repo.
2. Create **Web Service** on Render → **Use Docker**.
3. Keep defaults; Render sets `PORT`. The container reads `PORT` and binds to it.
4. After deploy, open the public URL.

**Notes**
- `.doc` and `.pdf` are normalized to a working `.docx`. PDF layout is not preserved (text only).
- Everything is ephemeral and in-memory.
