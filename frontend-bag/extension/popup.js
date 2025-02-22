// popup.js

document.addEventListener("DOMContentLoaded", () => {
    const resultsDiv = document.getElementById("results");
  
    document.getElementById("comparePriceBtn").addEventListener("click", () => {
      sendApiRequest("GET", "/api/compare-price?product_id=sampleProduct", (response) => {
        displayResult(response);
      });
    });
  
    document.getElementById("findCouponBtn").addEventListener("click", () => {
      sendApiRequest("GET", "/api/find-coupons?product_id=sampleProduct", (response) => {
        displayResult(response);
      });
    });
  
    document.getElementById("predictPriceBtn").addEventListener("click", () => {
      sendApiRequest("GET", "/api/predict-price?product_id=sampleProduct", (response) => {
        displayResult(response);
      });
    });
  
    function sendApiRequest(method, endpoint, callback) {
      // Adjust the backend domain as needed.
      const url = `http://localhost:5000/${endpoint}`;
      chrome.runtime.sendMessage({
        type: "API_REQUEST",
        method,
        url
      }, (response) => {
        callback(response);
      });
    }
  
    function displayResult(response) {
      if (response.success) {
        resultsDiv.innerText = JSON.stringify(response.data, null, 2);
      } else {
        resultsDiv.innerText = "Error: " + response.error;
      }
    }
  });
  