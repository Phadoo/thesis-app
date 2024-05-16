import numpy as np
from flask import Blueprint, request, jsonify
import pickle

prediction_blueprint = Blueprint('prediction_model', __name__)

model = pickle.load(open("WaterBacteria.pkl", "rb"))

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