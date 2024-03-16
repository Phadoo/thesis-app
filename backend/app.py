from flask import Flask, jsonify
from extensions import db
from sqlalchemy import text
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/thesis_schema'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from routes.chemical_blueprint import chemical_blueprint, Chemical
from routes.physical_blueprint import physical_blueprint, Physical
from routes.information_blueprint import information_blueprint, Information
from routes.reset_id_blueprint import reset_id_blueprint

db.init_app(app)

app.register_blueprint(chemical_blueprint)
app.register_blueprint(physical_blueprint)
app.register_blueprint(information_blueprint)
app.register_blueprint(reset_id_blueprint)

if __name__ == "__main__":

    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
