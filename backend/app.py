from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'kushalkhadarrahulbalajicharanlaxman'
jwt = JWTManager(app)
client = MongoClient("mongodb+srv://kushalbharadwaj68:0Zmd8OKBYNwOELmO@cluster0.hhwxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['judicialchatbot']
collection = db['users']
@app.route('/signup', methods=['POST'])
def api():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({ "message": "Email and password are required" }), 400
    if collection.find_one({ "email": email }):
        return jsonify({ "message": "User already exists" }), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    collection.insert_one({"name": name, "email": email, "password": hashed_password})
    return jsonify({ "message": "Data inserted successfully" }), 200
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({ "message": "Email and password are required" }), 400
    user = collection.find_one({ "email": email })
    if not user:
        return jsonify({ "message": "Invalid email or password" }), 401
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({ "message": "Invalid email or password" }), 401
    access_token = create_access_token(identity=email)
    return jsonify({ "message": "Login successful", "access_token": access_token }), 200
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({ "message": f"Welcome {current_user}!" })
if __name__ == "__main__":
	app.run(debug=True)