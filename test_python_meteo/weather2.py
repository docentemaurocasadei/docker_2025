import requests
import os

API_KEY = os.getenv("WEATHERAPI_KEY")
URL = "https://api.weatherapi.com/v1/forecast.json"

def get_weather_data(city):
    params = {
        "key": API_KEY,
        "q": city,
        "days": 3,   # max nel free plan
        "aqi": "no",
        "alerts": "no"
    }
    resp = requests.get(URL, params=params)
    data = resp.json()

    if "forecast" not in data:
        raise Exception(f"Errore API WeatherAPI: {data}")

    daily_temps = {}
    for day in data["forecast"]["forecastday"]:
        date = day["date"]
        temp = day["day"]["avgtemp_c"]
        daily_temps[date] = temp

    return daily_temps
