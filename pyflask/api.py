from __future__ import print_function
from flask import Flask, request, jsonify
from calc import calc as real_calc
import time

app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello():
    return "Server active!"

@app.route('/echo', methods=["POST"])
def echo():
    try:
        data = request.json
        print("Server: ", data["key"])
        return "Hello World from Server!"
    except Exception as e:
        raise e

@app.route('/add', methods=["POST"])
def add():
    try:
        data = request.json

        formula = data["expression"]

        # The return type must be a string, dict, tuple, Response instance, or WSGI callable 
        return str(real_calc(formula))
    except Exception as e:
        raise e

# :5000 is the flask default port. 
# You can change it to something else if you would like.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)