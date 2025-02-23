from flask import Flask, jsonify
from flask_restful import Api
from config import Config
from pymongo import MongoClient
import logging

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask-RESTful API
api = Api(app)

# Set up MongoDB client
client = MongoClient(app.config["MONGO_URI"])
db = client.get_default_database()

# Import API endpoints
from api.price import PriceComparisonResource
from api.coupons import CouponFinderResource
from api.predictions import PricePredictionResource
from api.sellers import SellerCheckResource

# Register endpoints
api.add_resource(PriceComparisonResource, '/api/compare-price/<path:url>')
api.add_resource(CouponFinderResource, "/api/find-coupons/<string:store_name>")
api.add_resource(PricePredictionResource, '/api/predict-price/<path:url>')
api.add_resource(SellerCheckResource, '/api/seller-check')

@app.route('/')
def index():
    return jsonify({"message": "BagThat AI Extension API is running."})

@app.route('/test') # This request is accepted by server
def test():
    return {"test": ["test1", "test2", "test3"]}



# Print all registered routes
with app.app_context():   #This is for debugging
    print(app.url_map)  

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=app.config["DEBUG"])
