import numpy as np
from sklearn.linear_model import LinearRegression

def train_and_predict(data):
    days = list(data.keys())
    temps = list(data.values())

    # codifichiamo i giorni come numeri
    X = np.arange(len(temps)).reshape(-1, 1)
    y = np.array(temps)

    model = LinearRegression()
    model.fit(X, y)

    # predizione prossimi 7 giorni
    future_X = np.arange(len(temps), len(temps)+7).reshape(-1, 1)
    future_preds = model.predict(future_X)

    return {f"day+{i+1}": round(temp, 2) for i, temp in enumerate(future_preds)}
