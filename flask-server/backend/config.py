import os
from dotenv import load_dotenv

load_dotenv()  # load environment variables from .env file

class Config:
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/bagthatdb')
