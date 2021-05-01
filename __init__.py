from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
import os

from .main.routes import main

load_dotenv()

def create_app() :
    app = Flask(__name__)
    CORS(app,  resources={r"/*": {"origins": os.getenv('CORS_ORIGINS').split(',')}})

    app.config['MONGO_URI'] = os.getenv('MONGO_URI')
    mongo = PyMongo()
    mongo.init_app(app)

    app.register_blueprint(main)

    return app