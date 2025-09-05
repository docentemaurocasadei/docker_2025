FROM python:3.11-slim
LABEL maintainer="mauro casadei"
LABEL version="1.0"
LABEL description="API Flask di test in Docker"
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
COPY app/. .
EXPOSE 5000
CMD ["python", "app.py"]