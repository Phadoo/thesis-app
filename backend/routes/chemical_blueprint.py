from flask import Blueprint, jsonify, request
from extensions import db, ma

chemical_blueprint = Blueprint('chemical_data', __name__)

class Chemical(db.Model):
    __tablename__ = 'tbl_chemical'
    chemical_id = db.Column(db.Integer, primary_key=True)
    nitrate = db.Column(db.Numeric(precision=5, scale=2))
    zinc = db.Column(db.Numeric(precision=5, scale=2))
    chlorine = db.Column(db.Numeric(precision=5, scale=2))

    def __init__(self, nitrate, zinc, chlorine):
        self.nitrate = nitrate
        self.zinc = zinc
        self.chlorine = chlorine

class ChemicalSchema(ma.Schema):
    class Meta:
        fields = ('nitrate', 'zinc', 'chlorine')

chemical_schema = ChemicalSchema()
chemicals_schema = ChemicalSchema(many=True)

@chemical_blueprint.route('/get_chemical_data', methods = ['GET'])
def all_data():
    retrieved = Chemical.query.all()
    results = chemicals_schema.dump(retrieved)
    return jsonify(results)

@chemical_blueprint.route('/get_chemical_data/<id>', methods = ['GET'])
def specific_data(id):
    retrieved = Chemical.query.get(id)
    return chemical_schema.jsonify(retrieved)

@chemical_blueprint.route('/delete_chemical_data/<id>/', methods = ['DELETE'])
def delete_data(id):
    retrieved = Chemical.query.get(id)

    db.session.delete(retrieved)
    db.session.commit()

    return chemical_schema.jsonify(retrieved)