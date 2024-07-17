from flask import request, jsonify, Blueprint
import smtplib
from email.message import EmailMessage

email_blueprint = Blueprint('email', __name__)

@email_blueprint.route('/send-email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        data = request.get_json()
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        message = data.get('message')

        msg = EmailMessage()
        msg['Subject'] = 'BACTUBIG: New Inquiry'
        msg['From'] = 'tom.alec.tercenio11@gmail.com' 
        msg['To'] = 'tomtercenio08@gmail.com'  
        msg.set_content(f"""
            An inquiry has been submitted through the BACTUBIG website. Here are the details:
            
            Name: {first_name} {last_name}
            Email: {email}
            
            Message:
            {message}
        """)

        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp: 
                smtp.login('tom.alec.tercenio11@gmail.com', 'bhjx yrfk kxyx pktg') 
                smtp.send_message(msg)

            return jsonify({'message': 'Email sent successfully!'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Method not allowed'}), 405