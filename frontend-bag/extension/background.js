// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "API_REQUEST") {
      // Example: forward the request to the backend
      fetch(message.url, {
        method: message.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: message.data ? JSON.stringify(message.data) : null
      })
        .then((response) => response.json())
        .then((data) => sendResponse({ success: true, data }))
        .catch((error) => sendResponse({ success: false, error: error.toString() }));
      // Return true to indicate that response will be sent asynchronously
      return true;
    }
  });
  