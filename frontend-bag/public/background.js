console.log("Background script loaded!"); // ✅ Add this line to check if it runs

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message); // ✅ Debugging log
  if (message.action === "getTabURL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        sendResponse({ url: tabs[0].url });
      } else {
        sendResponse({ error: "Could not retrieve the current tab URL" });
      }
    });
    return true; // ✅ Keep async message response working
  }
});