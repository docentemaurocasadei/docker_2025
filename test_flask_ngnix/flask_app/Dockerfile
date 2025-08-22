# Usa un'immagine Python leggera
FROM python:3.11-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia requirements.txt e installa le dipendenze
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia tutto il codice dell'app
COPY . .

# Espone la porta Flask
EXPOSE 5000

# Comando di avvio
CMD ["python", "main.py"]
