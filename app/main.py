import logging
from flask import Flask, jsonify

# logger su stdout
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route("/")
def home():
    logger.info("root endpoint called")
    return jsonify(message="Hello from DevOps!")

@app.route("/health")
def health():
    logger.info("health check")
    return jsonify(status="ok")

if __name__ == "__main__":
    logger.info("Starting app")
    app.run(host="0.0.0.0", port=5000)
