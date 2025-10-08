# shim: re-export dal package reale app
from app.main import app  # se il file reale è app\main.py
__all__ = ["app"]
