from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()  # Get JSON data from the request
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists!"}), 400

    # Create a new user
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()  # Save to the database

    return jsonify({"message": "User created successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON data from request
    username = data.get('username')
    password = data.get('password')

    # Here you can add logic to validate the user, e.g., check if the user exists and the password matches.
    user = User.query.filter_by(username=username).first()

    if user and user.password == password:  # Replace with secure password hashing in production
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials!"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Query all users
    user_list = [{"id": user.id, "username": user.username} for user in users]  # Create a list of users
    return jsonify(user_list), 200


if __name__ == '__main__':
    with app.app_context():  # Create an application context
        db.create_all()  # Create tables if they don't exist
    app.run(host='0.0.0.0', port=5000, debug=True)
