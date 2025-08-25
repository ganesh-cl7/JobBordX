from flask import Blueprint, request, jsonify
from app import db
from app.models import Job


routes = Blueprint('routes', __name__)

@routes.route('/api/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    new_job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        description=data['description'],
        experience=data.get('experience'),
        skills=data.get('skills'),
        type=data.get('type'),
        salary=data.get('salary'),
        remote=data.get('remote', False)
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({'message': 'Job created successfully'}), 201

@routes.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    job_list = [{
        'id': job.id,
        'title': job.title,
        'company': job.company,
        'location': job.location,
        'description': job.description,
        'experience': job.experience,
        'skills': job.skills,
        'type': job.type,
        'salary': job.salary,
        'remote': job.remote
    } for job in jobs]
    return jsonify(job_list)
