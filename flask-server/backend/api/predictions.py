from flask_restful import Resource, reqparse, request
from flask import jsonify
from utils.price_prediction import predict_price_trend
import logging


import pickle
# import numpy as np NUMPY DOESNT WORK AT ALL


logger = logging.getLogger(__name__)

class PricePredictionResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('product_id', type=str, required=True, help='Product ID is required')
        args = parser.parse_args()

        # Stub: call our price prediction utility.
        prediction = predict_price_trend(args['product_id'])
        logger.info("Price prediction for product %s: %s", args['product_id'], prediction)
        return {"product_id": args['product_id'], "prediction": prediction}, 200
    
    def post(self, url):
        data = request.get_json()
        url = data.get("url")
        if url:
            return jsonify({"message": "URL received", "url": url})
        return jsonify({"error": "No URL provided"}), 400
    
    
    
    #with open("models/amazon_price_predictor.pkl", "rb") as file:
        #PriceModel = pickle.load(file)

    # THIS CODE IS INCOMPLETE BECAUSE NUMPY DOESNT WORK AT ALLLLLLLL