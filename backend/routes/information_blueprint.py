from flask import Blueprint, jsonify, request
from extensions import db, ma
from routes.chemical_blueprint import Chemical, ChemicalSchema
from routes.physical_blueprint import Physical, PhysicalSchema

information_blueprint = Blueprint('information_data', __name__)

class Information(db.Model):
    __tablename__ = 'tbl_information'
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.Text())
    status = db.Column(db.Text())

    physical_id = db.Column(db.Integer, db.ForeignKey('tbl_physical.physical_id'))
    physical_table = db.relationship('Physical', backref='information')

    chemical_id = db.Column(db.Integer, db.ForeignKey('tbl_chemical.chemical_id'))
    chemical_table = db.relationship('Chemical', backref='information')

    def __init__(self, location, status, physical_id, chemical_id):
        self.location = location
        self.status = status
        self.physical_id = physical_id
        self.chemical_id = chemical_id

class InformationSchema(ma.Schema):
    class Meta:
        fields = ('id','location', 'status', 'physical_id', 'chemical_id')

information_schema = InformationSchema()
informations_schema = InformationSchema(many=True)

physical_schema = PhysicalSchema()
physicals_schema = PhysicalSchema(many=True)

chemical_schema = ChemicalSchema()
chemicals_schema = ChemicalSchema(many=True)

@information_blueprint.route('/get_information', methods = ['GET'])
def all_data():
    retrieved = Information.query.all()
    results = informations_schema.dump(retrieved)
    return jsonify(results)

@information_blueprint.route('/get_information/<id>', methods = ['GET'])
def specific_data(id):
    retrieved = Information.query.get(id)
    return information_schema.jsonify(retrieved)

@information_blueprint.route('/update_information/<id>/', methods = ['PUT'])
def update_data(id):
    retrieved = Information.query.get(id)

    location = request.json['location']
    status = request.json['status']

    retrieved.location = location
    retrieved.status = status

    db.session.commit()
    return information_schema.jsonify(retrieved)

@information_blueprint.route('/delete_information/<id>/', methods = ['DELETE'])
def delete_data(id):
    retrieved = Information.query.get(id)

    db.session.delete(retrieved)
    db.session.commit()

    return information_schema.jsonify(retrieved)
    
@information_blueprint.route('/get_all_data/<id>/', methods = ['GET'])
def get_all_data(id):
    try:
        info_table = Information.query.get(id)
        physical_table = Physical.query.get(id)
        chemical_table = Chemical.query.get(id)

        serialized_info = information_schema.dump(info_table)
        serialized_physical = physical_schema.dump(physical_table)
        serialized_chemical = chemical_schema.dump(chemical_table)

        result = {
            'information': serialized_info,
            'physical': serialized_physical,
            'chemical': serialized_chemical
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@information_blueprint.route('/get_all_data', methods = ['GET']) # RETRIEVE ALL DATA FROM DB
def get_complete_data():
    try:
        query_result = db.session.query(
            Information.id,
            Information.location,
            Information.status,
            Physical.temperature,
            Physical.ph,
            Physical.tds,
            Physical.turbidity,
            Chemical.nitrate,
            Chemical.zinc,
            Chemical.chlorine
        ).join(
            Physical, Information.physical_id == Physical.physical_id
        ).join(
            Chemical, Information.chemical_id == Chemical.chemical_id
        ).all()

        result = [{
            'id': row[0],
            'location': row[1],
            'status': row[2],
            'temperature': row[3],
            'ph': row[4],
            'tds': row[5],
            'turbidity': row[6],
            'nitrate': row[7],
            'zinc': row[8],
            'chlorine': row[9]
        } for row in query_result]

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@information_blueprint.route('/new_entry', methods=['GET'])
def new_entry():
    try:
        location = "new entry"
        status = " "

        # Get parameters from the URL
        temperature = request.args.get('temp')
        tds = request.args.get('tds')
        turbidity = request.args.get('turb')
        
        # Convert parameters to appropriate types
        temperature = float(temperature) if temperature else 0
        tds = float(tds) if tds else 0
        turbidity = float(turbidity) if turbidity else 0
        
        ph = 0
        nitrate = 0
        zinc = 0
        chlorine = 0

        # Create Physical and Chemical objects
        physical = Physical(temperature, ph, tds, turbidity)
        chemical = Chemical(nitrate, zinc, chlorine)

        # Add to the session and commit
        db.session.add(physical)
        db.session.add(chemical)
        db.session.commit()

        # Create Information object
        info = Information(location, status, physical_id=physical.physical_id, chemical_id=chemical.chemical_id)
        db.session.add(info)
        db.session.commit()

        # Serialize the info object
        serialized_info = information_schema.dump(info)
        info_dict = serialized_info[0] if isinstance(serialized_info, list) else serialized_info

        return jsonify(info_dict)
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
