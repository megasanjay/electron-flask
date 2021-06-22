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

const echo = (reqObj) => {
  axios
    .post(`${SERVER_URL}/echo`, reqObj)
    .then((response) => {
      console.log("Server response: ", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const requestObject = {
  key: "Hello world from Electron!",
};

echo(requestObject); // Send a POST request to backend

let inputExpression = document.getElementById("inputExpression");
let result = document.getElementById("result");

document.getElementById("calcSum").addEventListener("click", () => {
  if (inputExpression.value != "") {
    let reqObj = { expression: inputExpression.value };
    axios
      .post(`${SERVER_URL}/add`, reqObj)
      .then((response) => {
        result.innerHTML = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
