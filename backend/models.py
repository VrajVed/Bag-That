# Example stub for models. You can expand these as needed.

def get_product_by_id(product_id, db):
    """Retrieve product information from the database."""
    return db.products.find_one({"_id": product_id})

def save_coupon(coupon_data, db):
    """Save coupon data to the database."""
    result = db.coupons.insert_one(coupon_data)
    return str(result.inserted_id)
