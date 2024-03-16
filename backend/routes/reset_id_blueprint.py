from flask import Blueprint, jsonify, current_app
from extensions import db
from sqlalchemy import text

reset_id_blueprint = Blueprint('reset_id', __name__)

@reset_id_blueprint.route('/reset_id', methods = ['POST'])
def reset_id():
    db.session.execute(text('TRUNCATE TABLE physical'))
    db.session.commit()
    
    return jsonify({"message": "ID reset successful"})