import os
from flask import Flask, jsonify, request, abort
from models import db, Store

def create_app():
    app = Flask(__name__)

    # Connessione al DB da variabili d'ambiente (.env)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Creazione tabelle se non esistono
    with app.app_context():
        db.create_all()

    # Route protetta da token per lista stores
    @app.route("/stores", methods=["GET"])
    def get_stores():
        token = request.headers.get("Authorization")
        expected_token = f"Bearer {os.getenv('API_TOKEN')}"

        if token != expected_token:
            abort(401, description="Unauthorized: invalid token")

        stores = Store.query.all()
        return jsonify([
            {
                "id": s.id,
                "name": s.name,
                "logo": s.logo,
                "message": s.message,
                "site": s.site,
                "fb_url": s.fb_url,
                "ig_url": s.ig_url
            }
            for s in stores
        ])

    return app


# Entry point per Gunicorn
app = create_app()
