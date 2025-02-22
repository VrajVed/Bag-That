import React, { useEffect, useState } from 'react';

const FetchPrice = () => {
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [isSupportedWebsite, setIsSupportedWebsite] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const supportedWebsites = ['amazon', 'ebay', 'walmart','flipkart']; // Example supported websites
  
  useEffect(() => {
    const fetchCurrentTabURL = async () => {
      try {
        if (!chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
          throw new Error('Chrome runtime API is not available');
        }

        console.log('Sending message to background script...');
        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'getTabURL' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Runtime error:', chrome.runtime.lastError.message);
              resolve({ error: chrome.runtime.lastError.message });
            } else {
              console.log('Received response from background script:', response);
              resolve(response);
            }
          });
        });
        
        if (response.error) {
          throw new Error(response.error);
        }
        
        const currentURL = response.url;
        console.log('Current Tab URL:', currentURL);
        
        // Send URL to Flask backend
        await fetch("http://127.0.0.1:5000/api/compare-price/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: currentURL })
          });
  
          console.log("URL sent to backend successfully");
  
        } catch (error) {
          console.error("Error fetching or sending URL:", error);
        }
  
    };
    
    fetchCurrentTabURL();
  }, []);

}

export default PriceComparision;