from app.main import app

def test_home():
    client = app.test_client()
    r = client.get("/")
    assert r.status_code == 200
    assert b"Hello from DevOps" in r.data
