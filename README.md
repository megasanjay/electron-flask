## Requirements: 
If we are using the conda environment add flask to the environment file.
```bash
pip install flask
pip install pyinstaller

# for windows only
pip install pypiwin32 # for pyinstaller
```

## renderer.js
```js
const axios = require("axios");

const SERVER_URL = "http://127.0.0.1:5000";

// Check server connection
(() => {
  axios
    .get(`${SERVER_URL}/`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
})();

const requestObject = {
  key: "Hello world from Electron!",
};

const echo = (requestObject) => {
  axios
    .post(`${SERVER_URL}/echo`, requestObject)
    .then((response) => {
      console.log("Server response: ", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
```
Using the axios library, the backend will behave just like a regular web server. Use `axios.get()`, `axios.post()`, etc... to send the requests to the api. The `SERVER_URL` will remain constant and the port will be whatever is defined in `main.js`. If you need timeouts set the appropriate timeouts directly in the axios request.

## api.py

```python
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

# :5000 is the flask default port. 
# You can change it to something else if you would like.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
```
You can use this template to start. All the routes are defined under the `@app.route(<endpoint>, methods=["method"])` syntax. Keep the function name inside the route descriptive. Use only one `def` inside the route and for any additional functions, declare/define them outside the `@app` block.

The return type must be a string, dict, tuple, Response instance, or WSGI callable (NO INT RETURNS)

## For quick testing 

If you don't want to have to create the python process everytime, use the following instructions to have a more realtime view of the program. Set the `createPyProc` to not run.

```js
// main.js

const createPyProc = () => {
  return;
}
```
Open the flask backend on the terminal window. You will be able to see all the requests that come through. If you set any print statements in your python output, they will be visible here as well. To run this:
```bash
python ./api.py
```



<br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br />
