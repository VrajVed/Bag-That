// content.js

// Example: Automatically check the current domain for coupons
(() => {
    const currentDomain = window.location.hostname;
    console.log("Current Domain:", currentDomain);
    // You can send a message to the background script if needed
    chrome.runtime.sendMessage({
      type: "API_REQUEST",
      method: "GET",
      url: `http://127.0.0.1:5000/api/find-coupons?product_id=${encodeURIComponent(currentDomain)}`
    }, (response) => {
      if (response.success) {
        console.log("Coupons for domain:", response.data);
        // Optionally, inject a coupon overlay into the page
      }
    });
  })();
  