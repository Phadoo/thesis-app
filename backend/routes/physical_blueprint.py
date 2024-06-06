from flask import Blueprint, jsonify, request
from extensions import db, ma

physical_blueprint = Blueprint('physical_data', __name__)

class Physical(db.Model):
    __tablename__ = 'tbl_physical'
    physical_id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Numeric(precision=5, scale=2))
    ph = db.Column(db.Numeric(precision=5, scale=2))
    tds = db.Column(db.Numeric(precision=5, scale=2))
    turbidity = db.Column(db.Numeric(precision=5, scale=2))

    def __init__(self, temperature, ph, tds, turbidity):
        self.temperature = temperature
        self.ph = ph
        self.tds = tds
        self.turbidity = turbidity

class PhysicalSchema(ma.Schema):
    class Meta:
        fields = ('temperature', 'ph', 'tds', 'turbidity')

physical_schema = PhysicalSchema()
physicals_schema = PhysicalSchema(many=True)

@physical_blueprint.route('/get_physical_data', methods = ['GET'])
def all_data():
    retrieved = Physical.query.all()
    results = physicals_schema.dump(retrieved)
    return jsonify(results)

@physical_blueprint.route('/get_physical_data/<id>', methods = ['GET'])
def specific_data(id):
    retrieved = Physical.query.get(id)
    return physical_schema.jsonify(retrieved)

@physical_blueprint.route('/delete_physical_data/<id>/', methods = ['DELETE'])
def delete_data(id):
    retrieved = Physical.query.get(id)

    db.session.delete(retrieved)
    db.session.commit()

    return physical_schema.jsonify(retrieved)