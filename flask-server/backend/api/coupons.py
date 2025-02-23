from flask_restful import Resource, reqparse, abort
import logging

logger = logging.getLogger(__name__)


coupons = [

            # AMAZON.COM

            {"store": "amazon.com", "code": "45LGY1E2", "description": "Save 65% on your order","verified": True },
            {"store": "amazon.com", "code": "40H7IYDP", "description": "Save 55% on your order","verified": True },
            {"store": "amazon.com", "code": "MHC423M2", "description": "Save 50% on select items at Amazon","verified": True },
            {"store": "amazon.com", "code": "50JMPUJU", "description": "Take 60% Off 20W USB C Iphone 16 15 Charger","verified": False },
            {"store": "amazon.com", "code": "C3EIJTSQ", "description": "Amazon Coupon Code to Save 68% Off Label Maker","verified": True },
            
            # WALMART.COM
            
            {"store": "walmart.com", "code": "TRIPLE20", "description": "$20 Off $50+ Walmart Coupon Code For Eligible Customers","verified": False },
            {"store": "walmart.com", "code": "TRIPLE10", "description": "$10 Off Your First 3 Orders Over $50 Via App","verified": True },
            {"store": "walmart.com", "code": "WBSAVINGS3", "description": "Walmart Business: $20 Off Walmart Coupon On 3 Orders Of $100+","verified": False },
            {"store": "walmart.com", "code": "3RDN10G", "description": "10% Off Any Purchase for New Customers","verified": False },
            {"store": "walmart.com", "code": "20INHOME", "description": "$20 Off in-Home Delivery Orders","verified": False },
            {"store": "walmart.com", "code": "WB20BACK", "description": "$20 Off $100+ Walmart Coupon Code At Business","verified": True },
            {"store": "walmart.com", "code": "TRYWMB15", "description": "Walmart Promo Code: $15 Off 3 $75+ Orders At Walmart Business","verified": False },
            {"store": "walmart.com", "code": "sxmplatform23", "description": "Free $1300 Value Gift on the Membership","verified": False },
            {"store": "walmart.com", "code": "RDCDC10", "description": "10% off any purchase","verified": True },
            {"store": "walmart.com", "code": "wowfresh", "description": "$10 Off $50+ Grocery Items for Members","verified": True },
            {"store": "walmart.com", "code": "DCUPRD23", "description": "10% Off Any Purchase","verified": False },
            {"store": "walmart.com", "code": "ZENTEN", "description": "10% Off $50+ Orders","verified": True },
            {"store": "walmart.com", "code": "E2EFB23", "description": "10% Off Any Purchase","verified": True },
            {"store": "walmart.com", "code": "10INHOME", "description": "$10 Off in-Home Delivery Purchases","verified": True },
            {"store": "walmart.com", "code": "RD23POP", "description": "5% Off Any Purchase for New Customers","verified": True },
            {"store": "walmart.com", "code": "RDN5", "description": "5% Off Any Purchase","verified": True },
            {"store": "walmart.com", "code": "TODAY10", "description": "$10 Off Orders for $150 & Under","verified": False },
            {"store": "walmart.com", "code": "CABKN37Z92", "description": "22% Off Sitewide","verified": False },
            {"store": "walmart.com", "code": "TRIPLE15", "description": "$15 Off 3 Orders","verified": False },

            # EBAY.COM

            {"store": "ebay.com", "code": "SAVE10PARTS", "description": "10% Off Select Sellers Items for Registered Members","verified": True },
            {"store": "ebay.com", "code": "LUXE10", "description": "10% Off New Oris Big Crown Pointer Date Unisex Watch for Members","verified": True },
            {"store": "ebay.com", "code": "ADISALE40", "description": "Extra 40% Off Your Order","verified": True },
            {"store": "ebay.com", "code": "POLISHCOLLECT", "description": "Extra 20% Off Your Order","verified": True },
            {"store": "ebay.com", "code": "OLSFEB25", "description": "Up to 25% Off Select Items for Members","verified": True },
            {"store": "ebay.com", "code": "BQCOLLECTIBLES1", "description": "Extra 15% Off Your Purchase","verified": True },
            {"store": "ebay.com", "code": "ANKER25LOVE", "description": "20% Off Soundcore Sleep A20 Earbuds Noise Blocking Sleep Headphone Sleep","verified":False },
            {"store": "ebay.com", "code": "FANSHOP25", "description": "15% Off Select Items","verified": True },
            {"store": "ebay.com", "code": "ECOFLOWPREZ20", "description": "20% Off Select Products for Members","verified": False },
            {"store": "ebay.com", "code": "SWSWINTERCOLLEC", "description": "Extra 30% Off Your Purchase","verified": True },
            {"store": "ebay.com", "code": "HONESTPET25", "description": "Extra $5 Off $200+ Orders from Top Sellers","verified": True },
            {"store": "ebay.com", "code": "TRAILBLAZER", "description": "20% Off Orders","verified": True },
            {"store": "ebay.com", "code": "BANCROFT10SALE", "description": "Extra 10% Off 2+ Items","verified": False },
            {"store": "ebay.com", "code": "20PERCENTOFFALL", "description": "Extra 20% Off Select Products for Members","verified": True },
            {"store": "ebay.com", "code": "DEESDEALS20", "description": "Extra 20% Off Select Items","verified": False },
            {"store": "ebay.com", "code": "OWD20WOW", "description": "20% Off Citizen & Bulova Watches","verified": False },
            {"store": "ebay.com", "code": "INDUSTR2025", "description": "40% Off Panasonic Fax Machine KX-FP706 + Free Shipping","verified": False },
            {"store": "ebay.com", "code": "OFFICIALLOVE25S", "description": "Extra 50% Off Select Bulova Bracelets","verified": False },
            {"store": "ebay.com", "code": "PREZ20", "description": "20% Off Select Items for Members","verified": False },
            {"store": "ebay.com", "code": "EVERYTHING50OFF", "description": "50% Off Orders","verified": False },
            {"store": "ebay.com", "code": "ECOUSADEC24", "description": "$5 Off Select Items for Members","verified": False },
            {"store": "ebay.com", "code": "OFFICIALLOVE25", "description": "Extra 60% Off Alpina Women's Comtesse Sport Watch","verified": False },
            {"store": "ebay.com", "code": "LOVE25LUX", "description": "15% Off Luxury Fashion Accessories","verified": False },
            {"store": "ebay.com", "code": "UPTO50OFFFORALL", "description": "Up to 90% Off PCs & Laptops","verified": False },
            {"store": "ebay.com", "code": "MODAVE25", "description": "Extra 25% Off Clothing Styles","verified": False },
            {"store": "ebay.com", "code": "JUMPSALE", "description": "Extra $15 Off Goodall Jump Pack 12V 10000 Amp","verified": False },
            {"store": "ebay.com", "code": "CELEBRATE20", "description": "20% Off Love Fashions","verified": False },
            {"store": "ebay.com", "code": "OMG50PERCENTOFF", "description": "50% Off Select Items for Members","verified": False },
            {"store": "ebay.com", "code": "PLUSVALUE", "description": "Extra 15% Off New Brands","verified": False },

            # TARGET.COM

            {"store": "target.com", "code": "SAVE20", "description": "Up to 20% Off Eligible Orders","verified": False },
            {"store": "target.com", "code": "SAVENOW", "description": "20% Off Your Next Order","verified": False },
            {"store": "target.com", "code": "STYLE", "description": "25% Off Selected Items","verified": False },
            {"store": "target.com", "code": "SAVE5", "description": "$5 Off Select Sonicare Items","verified": False },

            # AMAZON.IN

            {"store": "amazon.in", "code": "COOL", "description": "Upto 70% off your order","verified": False },
            {"store": "amazon.in", "code": "SHOP30CC", "description": "Save 80% off with code","verified": False },
            {"store": "amazon.in", "code": "POSITIVE10", "description": "Enjoy 10% Savings with promo code","verified": False },
            {"store": "amazon.in", "code": "Grasim20", "description": "20% off Grasim Brand","verified": False },
            {"store": "amazon.in", "code": "SAVE35PC", "description": "Save 35% off w/ promo code","verified": False },
            {"store": "amazon.in", "code": "MAHIAD30", "description": "Save 50% Off w/ Discount Code","verified": False },
            {"store": "amazon.in", "code": "JLZEFGGT", "description": "Today ONLY: 10% off with coupon code","verified": False },
            {"store": "amazon.in", "code": "CRAZYJOU", "description": "Extra 25% off discount","verified": False },
            {"store": "amazon.in", "code": "COOL", "description": "Upto 70% off your order","verified": False },
            {"store": "amazon.in", "code": "SHOP30PC", "description": "Save 30% off","verified": False },
            {"store": "amazon.in", "code": "BUY30PCT", "description": "30% off using code","verified": False },
            {"store": "amazon.in", "code": "IRCTC30H", "description": "Save 30% off","verified": False },
            {"store": "amazon.in", "code": "GMPU48AI", "description": "Save 10% off with coupon code","verified": False },
            {"store": "amazon.in", "code": "AMZOFF3K", "description": "Save 30% off using code","verified": False },
            {"store": "amazon.in", "code": "YB873NUE", "description": "Save 25% off","verified": False },
            {"store": "amazon.in", "code": "COUPON15", "description": "Save 70% off using coupon code","verified": False },

            # FLIPKART.COM

            {"store": "flipkart.com", "code": "FLYFK", "description": "Enjoy upto 15% off domestic & international flights with code","verified": False },
            {"store": "flipkart.com", "code": "ROUNDTRIP", "description": "Get $3500 off your order","verified": False },
            {"store": "flipkart.com", "code": "FKDOM", "description": "Get 6% off your purchase","verified": False },
            {"store": "flipkart.com", "code": "FKBEST", "description": "Save extra 15% on any items","verified": False },
            {"store": "flipkart.com", "code": "AXISCASHBACK", "description": "7% off your purchase","verified": False },
            {"store": "flipkart.com", "code": "WEDNESDAY13", "description": "13% off your order","verified": False },
            {"store": "flipkart.com", "code": "FLYMH", "description": "Upto 20% off your booking","verified": False },
            {"store": "flipkart.com", "code": "SAVER", "description": "$950 off your order","verified": False },
            {"store": "flipkart.com", "code": "ZEROFEE", "description": "Save 5% off with discount code","verified": False },
            {"store": "flipkart.com", "code": "BOBCC", "description": "Upto 14% off your order","verified": False },
            {"store": "flipkart.com", "code": "SPECIALT3500", "description": "35% off your order","verified": False },
            {"store": "flipkart.com", "code": "FLYID", "description": "Save extra 4% on domestic and international flight bookings","verified": False },
            {"store": "flipkart.com", "code": "FKGZSFD9CDYHHJD", "description": "upto 10% off any purchase","verified": False },
            {"store": "flipkart.com", "code": "FLYSBI", "description": "12% off","verified": False },
            {"store": "flipkart.com", "code": "FLASH20", "description": "20% off any order","verified": False },
            {"store": "flipkart.com", "code": "FLYBSD", "description": "Save 10% on hdfc bank credit cards","verified": False },
            {"store": "flipkart.com", "code": "FLYBDS", "description": "16% off with coupon","verified": False },
            {"store": "flipkart.com", "code": "FESTIVE", "description": "upto 17% off on flights","verified": False },
            {"store": "flipkart.com", "code": "HDFCEMI", "description": "Save on flipkart flight bookings with code","verified": False },
            {"store": "flipkart.com", "code": "FLYBSD", "description": "Save 10% on hdfc bank credit cards","verified": False },
            {"store": "flipkart.com", "code": "FLYSEP", "description": "3500Rs off flights","verified": False }, 

            # UDEMY.COM

            {"store": "udemy.com", "code": "KEEPLEARNING", "description": "something","verified": False },
            {"store": "udemy.com", "code": "UDEAFFHP12025", "description": "something","verified": True },
            {"store": "udemy.com", "code": "NVDIN35", "description": "Around 80% off","verified": True },
            {"store": "udemy.com", "code": "GENAISALE24", "description": "Around 85% off","verified": True },
            {"store": "udemy.com", "code": "UDEAFFLP12025", "description": "Around 80% off","verified": True },
            {"store": "udemy.com", "code": "RISKAGGREGATION2502", "description": "25% Off Project Portfolio Risk Aggregation Process Course Orders","verified": True },

        ]



def storeNotFound(store_name):
    if store_name not in coupons:
        abort(404, "Store not found...")

class CouponFinderResource(Resource):
    def get(self, store_name):
       
       response = []
       for coupon in coupons:
           if coupon.get("store").lower() == store_name.lower():        # RETURNS COUPONS WITH STORE NAME
               response.append({
                   "code": coupon.get("code"),
                    "description": coupon.get("description"),
                    "verified": coupon.get("verified", False)
                },)
       return response

    def post(self):
        # Allow users to submit new coupons.
        pass
