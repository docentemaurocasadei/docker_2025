from flask import Flask, jsonify, request
from weather2 import get_weather_data
from model import train_and_predict

app = Flask(__name__)

@app.route("/")
def home():
    return "Weather AI App in Python!"

@app.route("/forecast", methods=["GET"])
def forecast():
    city = request.args.get("city", "Rome")
    data = get_weather_data(city)
    prediction = train_and_predict(data)
    return jsonify({
        "city": city,
        "history": data,
        "prediction_next_week": prediction
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
