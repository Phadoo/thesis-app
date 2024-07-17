import numpy as np
from flask import Blueprint, request, jsonify
import pickle
from extensions import db, ma
from routes.chemical_blueprint import Chemical, ChemicalSchema
from routes.physical_blueprint import Physical, PhysicalSchema
from routes.information_blueprint import Information, InformationSchema

prediction_blueprint = Blueprint('prediction_model', __name__)

model = pickle.load(open("WaterBacteria.pkl", "rb"))

information_schema = InformationSchema()
informations_schema = InformationSchema(many=True)

physical_schema = PhysicalSchema()
physicals_schema = PhysicalSchema(many=True)

chemical_schema = ChemicalSchema()
chemicals_schema = ChemicalSchema(many=True)

@prediction_blueprint.route('/predict', methods=["POST"])
def predict():
    try:
        json_data = request.get_json()  # Get JSON data from the request
        if json_data is None:
            return jsonify({"error": "No JSON data provided"}), 400
        
        # Extract feature values from JSON data based on keys
        features = [float(json_data[key]) for key in json_data]
        features_array = [np.array(features)]
        
        prediction = model.predict(features_array)

        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@prediction_blueprint.route('/update_entry', methods=['PUT'])
def update_entry():
    try:
        # Retrieve data from the PUT request
        data = request.get_json()
        entry_id = data.get('id')  # Assuming you have an ID to identify the entry to update
        
        # Retrieve the existing entry from the database
        info = Information.query.get(entry_id)
        
        if not info:
            return jsonify({'error': 'Entry not found'}), 404
        
        # Update location, update_text, and status
        info.location = data.get('location', info.location)
        info.update_text = data.get('update_text', info.update_text)
        info.status = data.get('status', info.status)
        
        # Update Physical values
        physical = Physical.query.get(info.physical_id)
        if physical:
            physical.temperature = data.get('temperature', physical.temperature)
            physical.ph = data.get('ph', physical.ph)
            physical.tds = data.get('tds', physical.tds)
            physical.turbidity = data.get('turbidity', physical.turbidity)
        
        # Update Chemical values
        chemical = Chemical.query.get(info.chemical_id)
        if chemical:
            chemical.nitrate = data.get('nitrate', chemical.nitrate)
            chemical.zinc = data.get('zinc', chemical.zinc)
            chemical.chlorine = data.get('chlorine', chemical.chlorine)
        
        # Commit the changes
        db.session.commit()
        
        # Serialize the updated info object
        serialized_info = information_schema.dump(info)
        info_dict = serialized_info[0] if isinstance(serialized_info, list) else serialized_info

        return jsonify(info_dict)
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@prediction_blueprint.route('/predict_and_update', methods=["POST"])
def predict_and_update():
    try:
        json_data = request.get_json()  # Get JSON data from the request
        if json_data is None:
            return jsonify({"error": "No JSON data provided"}), 400

        entry_id = json_data.get('id')  # Assuming the ID of the entry to update is provided in the request
        info = Information.query.get(entry_id)

        if not info:
            return jsonify({'error': 'Entry not found'}), 404

        # Retrieve Physical and Chemical data
        physical = Physical.query.get(info.physical_id)
        chemical = Chemical.query.get(info.chemical_id)

        if not physical or not chemical:
            return jsonify({'error': 'Physical or Chemical data not found'}), 404
        
        # Update other fields from the JSON data
        info.location = json_data.get('location', info.location)

        # Optionally update Physical values if provided in the request
        if 'Temperature' in json_data:
            physical.temperature = json_data.get('Temperature')
        if 'ph' in json_data:
            physical.ph = json_data.get('ph')
        if 'TDS' in json_data:
            physical.tds = json_data.get('TDS')
        if 'Turbidity' in json_data:
            physical.turbidity = json_data.get('Turbidity')

        # Optionally update Chemical values if provided in the request
        if 'nitrate' in json_data:
            chemical.nitrate = json_data.get('nitrate')
        if 'zinc' in json_data:
            chemical.zinc = json_data.get('zinc')
        if 'chlorine' in json_data:
            chemical.chlorine = json_data.get('chlorine')  # Assuming 'chlorine' is the correct field for 'Chlorides'

        # Extract features from the Physical and Chemical tables
        features = [
            physical.temperature,
            physical.ph,
            physical.tds,
            physical.turbidity,
            chemical.nitrate,
            chemical.zinc,
            chemical.chlorine 
        ]

        print(f"Features being fed into the model: {features}")  # Print the features

        features_array = [np.array(features)]

        # Make the prediction
        prediction = model.predict(features_array)[0]

        # Update the status with the prediction
        info.status = prediction

        # Commit the changes
        db.session.commit()

        # Serialize the updated info object
        serialized_info = information_schema.dump(info)
        info_dict = serialized_info[0] if isinstance(serialized_info, list) else serialized_info

        return jsonify({"prediction": prediction, "updated_entry": info_dict})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
