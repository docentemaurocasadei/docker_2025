from flask import Flask, jsonify, request
from datetime import datetime
import os
import mysql.connector


app = Flask(__name__)
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello from Flask API Mysql!"})

@app.route("/read", methods=["GET"])
def read():
    conn = mysql.connector.connect(
        host=os.environ.get("MYSQL_HOST", "localhost"),
        user=os.environ.get("MYSQL_USER", "root"),
        password=os.environ.get("MYSQL_PASSWORD", "password"),
        database=os.environ.get("MYSQL_DATABASE", "testdb")
    )
    cursor = conn.cursor(dictionary=True)  # per avere dizionari invece di tuple
    cursor.execute("SELECT * FROM test_table")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(rows)

@app.route("/install", methods=["GET"])
def install():
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("MYSQL_HOST", "localhost"),
            user=os.environ.get("MYSQL_USER", "root"),
            password=os.environ.get("MYSQL_PASSWORD", "password"),
            database=os.environ.get("MYSQL_DATABASE", "testdb")
        )
        cursor = conn.cursor()

        # Crea la tabella se non esiste
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS test_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        """)

        # Verifica se i dati esistono già
        cursor.execute("SELECT COUNT(*) FROM test_table")
        count = cursor.fetchone()[0]

        if count == 0:
            cursor.execute("""
                INSERT INTO test_table (name)
                VALUES ('Alice'), ('Bob'), ('Charlie')
            """)
            conn.commit()
            msg = "Table created and data inserted"
        else:
            msg = "Table already exists and contains data"

        cursor.close()
        conn.close()
        return jsonify({"status": msg})

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route("/write-log", methods=["GET"])
def write_log():
    log_dir = "/app/sslogs"  # cartella del volume
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, "app.log")


    with open(log_file, "a") as f:
        f.write("test" + "\n")

    return jsonify({"status": "ok", "written": "test"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)