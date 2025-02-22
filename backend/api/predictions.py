from flask_restful import Resource, reqparse
from utils.price_prediction import predict_price_trend
import logging

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
