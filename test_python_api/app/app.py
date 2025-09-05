from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello from Flask API!"})

@app.route("/api/add", methods=["POST"])
def add_numbers():
    data = request.json
    a = data.get("a", 0)
    b = data.get("b", 0)
    return jsonify({"result": a + b})

@app.route("/api/logs", methods=["GET"])
def log_message():
    print(f"Log: {datetime.now()}")
    return jsonify({"status": "logged"})

@app.route("/api/log-file", methods=["GET"])
def log_message2():
    with open("logs/app.log", "a") as f:   # "a" = append
        f.write(f"Log: {datetime.now()}\n")
    return jsonify({"status": "logged"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
