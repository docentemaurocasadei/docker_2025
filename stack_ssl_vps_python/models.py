from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Store(db.Model):
    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(255))
    message = db.Column(db.Text)
    site = db.Column(db.String(255))
    fb_url = db.Column(db.String(255))
    ig_url = db.Column(db.String(255))
    