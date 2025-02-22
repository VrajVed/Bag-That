from flask_restful import Resource, reqparse, request
from flask import jsonify
import logging

logger = logging.getLogger(__name__)

class PriceComparisonResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('product_id', type=str, required=True, help='Product ID is required')
        args = parser.parse_args()

        # Here, call third-party APIs or scrape to compare prices.
        # This is a stub response.
        response = {
            "product_id": args['product_id'],
            "prices": [
                {"store": "Amazon", "price": 299.99},
                {"store": "Flipkart", "price": 289.99},
                {"store": "BestBuy", "price": 310.00}
            ]
        }
        logger.info("Price comparison for product %s", args['product_id'])

        return response, 200
    
    def post(self, url):
        data = request.get_json()
        url = data.get("url")
        if url:
            return jsonify({"message": "URL received", "url": url})
        return jsonify({"error": "No URL provided"}), 400
        