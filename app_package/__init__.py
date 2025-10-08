# shim per compatibilità: re-esporta oggetti dal package reale
# modifica questi import se il tuo app è in app.main o app.app
try:
    from app.main import *   # preferito se hai app/main.py
except Exception:
    try:
        from app import *   # se il package app espone l'app nel __init__.py
    except Exception:
        # ultimo tentativo: importa da app.py
        from importlib import import_module
        m = import_module("app")
        globals().update({k:v for k,v in m.__dict__.items() if not k.startswith("_")})
__all__ = [k for k in globals().keys() if not k.startswith("_")]
