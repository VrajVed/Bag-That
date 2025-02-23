import React, { useEffect, useState } from 'react';
/* global chrome */

const defaultCoupons = {
  amazon: [
    { code: 'SAVE20', discount: '20% OFF', description: 'Save 20% on your first purchase' },
    { code: 'SAVE20', discount: '20% OFF', description: 'Save 20% on your first purchase' },
    { code: 'SAVE20', discount: '20% OFF', description: 'Save 20% on your first purchase' },
    { code: 'SAVE20', discount: '20% OFF', description: 'Save 20% on your first purchase' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
    { code: 'PRIME10', discount: '10% OFF', description: 'Extra 10% off for Prime members' },
  ],
  ebay: [
    { code: 'EBAY15', discount: '15% OFF', description: 'Save 15% on electronics' },
    { code: 'FIRST25', discount: '25% OFF', description: 'New user special discount' },
  ],
  walmart: [
    { code: 'GROCERY20', discount: '20% OFF', description: 'Save on groceries' },
    { code: 'WMART10', discount: '10% OFF', description: 'Store-wide discount' },
  ],
  flipkart: [
    { code: 'FLIP50', discount: '50% OFF', description: 'Big savings on fashion' },
    { code: 'FIRST30', discount: '30% OFF', description: 'First-time shopper discount' },
  ],
};
const CouponFinder = () => {
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [isSupportedWebsite, setIsSupportedWebsite] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const supportedWebsites = ['amazon', 'ebay', 'walmart','flipkart']; // Example supported websites
  
  /*This is the Domain extraction function like amazon.com or .in etc */
  // const getDomainFromURL = (url) => {
  //   try {
  //     const parsedURL = new URL(url);
  //     const hostname = parsedURL.hostname.replace('www.', '').toLowerCase();
  //     // console.log('Extracted Domain:', hostname); 
  //     return hostname;
  //   } catch (error) {
  //     console.error('Invalid URL:', error);
  //     return '';
  //   }
  // };

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
  
        // Extract the full domain from the current URL
        const getDomainFromURL = (url) => {
          const domain = new URL(url).hostname; // Extracts the hostname
          const parts = domain.split(".");
          if (parts.length > 2) {
            // Removes "www" or any subdomain
            return parts.slice(-2).join(".");
          }
          return domain;
        };
  
        const domain = getDomainFromURL(currentURL);
        console.log('Full Domain:', domain);
  
        // Update the website name and supported status
        const url = new URL(currentURL);
        const hostname = url.hostname.replace('www.', '').toLowerCase();
        const websiteName = hostname.split('.')[0];
  
        console.log('Detected website:', websiteName);
        setCurrentWebsite(websiteName);
        console.log('Domain sent to API:', domain);
  
        // Check if the website is supported
        setIsSupportedWebsite(supportedWebsites.includes(websiteName));
  
        // Send the full domain to the backend
        await fetch(`http://127.0.0.1:5000/api/find-coupons/${domain}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
  
        console.log("URL sent to backend successfully");
      } catch (error) {
        console.error('Error fetching current tab URL:', error);
      }
    };
  
    fetchCurrentTabURL();
    // eslint-disable-next-line
  }, []);
  
  

 

 
  
  
  
  
  const getCouponsForWebsite = () => {
    return defaultCoupons[currentWebsite] || [];
  };
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000); // Reset after 2 seconds
  };
  return (
    <div className="w-[300px] bg-gray-900 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold absolute top-1 shadow-md  text-white">Bag That</h1>
        {currentWebsite && isSupportedWebsite && (
          <span className="px-3 py-1 shadow-md rounded-full absolute top-2 right-10 bg-gradient-to-r from-yellow-400 to-green-500 text-gray-900 font-semibold">
            {currentWebsite.charAt(0).toUpperCase() + currentWebsite.slice(1)}
          </span>
        )}
      </div>
  
      {!currentWebsite ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-10 h-10 border-4 border-yellow-400 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p className="text-white">Detecting website...</p>
        </div>
      ) : !isSupportedWebsite ? (
        <div className="flex flex-col items-center justify-center py-8">
          <svg 
            className="w-16 h-16 text-purple-500 mb-4" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z" />
          </svg>
          <p className="text-purple-500 text-lg font-medium">No coupons available for this website</p>
        </div>
      ) : (
        <div className="h-[400px] overflow-y-auto pr-2">
          <div className="space-y-2">
            {getCouponsForWebsite().map((coupon, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-white/10"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-yellow-400 font-bold text-base">
                    {coupon.discount}
                  </span>
                  <button 
                    onClick={() => handleCopy(coupon.code, index)}
                    className={`px-2 py-0.5 rounded font-medium text-sm transition-all duration-200 ${
                      copiedIndex === index
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-yellow-400 to-green-500 text-gray-900 hover:opacity-90'
                    }`}
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <code className="block bg-white/10 px-2 py-0.5 rounded text-white font-mono text-sm mb-1">
                  {coupon.code}
                </code>
                <p className="text-white text-xs">
                  {coupon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponFinder;