import requests
import os

API_KEY = os.getenv("OPENWEATHER_KEY")
URL = "https://api.openweathermap.org/data/2.5/forecast"

def get_weather_data(city):
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
        "lang": "it"
    }
    resp = requests.get(URL, params=params)
    data = resp.json()

    # Se c’è stato un errore nell’API
    if "list" not in data:
        raise Exception(f"Errore API OpenWeather: {data}")

    daily_temps = {}
    for item in data["list"]:
        day = item["dt_txt"].split(" ")[0]
        temp = item["main"]["temp"]
        daily_temps.setdefault(day, []).append(temp)

    avg_temps = {day: sum(vals)/len(vals) for day, vals in daily_temps.items()}
    return avg_temps
