"""
Database models for Correios Contrata application
"""
from datetime import datetime
from app import db

class Program(db.Model):
    """Model for government education programs"""
    __tablename__ = 'programs'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ministry = db.Column(db.String(100), nullable=False)
    program_type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='active')
    published_date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Program {self.title}>'

class Position(db.Model):
    """Model for job positions within programs"""
    __tablename__ = 'positions'
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    requirements = db.Column(db.Text)
    salary_min = db.Column(db.Numeric(10, 2))
    salary_max = db.Column(db.Numeric(10, 2))
    workload_hours = db.Column(db.Integer)
    work_type = db.Column(db.String(50))
    program_id = db.Column(db.Integer, db.ForeignKey('programs.id'), nullable=False)
    
    def __repr__(self):
        return f'<Position {self.name}>'