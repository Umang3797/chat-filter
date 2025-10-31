from __future__ import annotations
import time
import uuid
from typing import Dict, Any

class InMemorySessions:
    def __init__(self, ttl_seconds: int = 5400):  # 90 minutes
        self.ttl = ttl_seconds
        self._store: Dict[str, Dict[str, Any]] = {}

    def new(self) -> str:
        sid = uuid.uuid4().hex
        self._store[sid] = {"created": time.time(), "updated": time.time(), "data": {}}
        return sid

    def get(self, sid: str) -> Dict[str, Any] | None:
        s = self._store.get(sid)
        if not s:
            return None
        if time.time() - s["updated"] > self.ttl:
            self._store.pop(sid, None)
            return None
        return s["data"]

    def set(self, sid: str, data: Dict[str, Any]):
        if sid in self._store:
            self._store[sid]["data"] = data
            self._store[sid]["updated"] = time.time()

    def touch(self, sid: str):
        if sid in self._store:
            self._store[sid]["updated"] = time.time()
