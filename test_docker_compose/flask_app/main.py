from flask import Flask
import mysql.connector
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "Flask with ENV config is running!"

@app.route('/db')
def test_db():
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME")
        )
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        return f"Connected to DB! Tables: {tables}"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
