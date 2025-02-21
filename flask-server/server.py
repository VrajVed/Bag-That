from flask import Flask

app = Flask(__name__)

@app.route('/test')
def test():
    return {"test": ["test1", "test2", "test3"]}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)