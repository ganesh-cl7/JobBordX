from app import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    experience = db.Column(db.String(50))
    skills = db.Column(db.String(200))
    type = db.Column(db.String(50))
    salary = db.Column(db.String(50))
    remote = db.Column(db.Boolean, default=False)
