import React, { useEffect, useState } from 'react';
/* global chrome */

const CouponFinder = () => {
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [isSupportedWebsite, setIsSupportedWebsite] = useState(false);
  const [coupons, setCoupons] = useState([]); // State to store fetched coupons
  const [copiedIndex, setCopiedIndex] = useState(null);
  const supportedWebsites = ['amazon', 'ebay', 'walmart', 'flipkart','target','udemy']; // Example supported websites

  useEffect(() => {
    const fetchCurrentTabURL = async () => {
      try {
        if (!chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
          throw new Error('Chrome runtime API is not available');
        }

        const response = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: 'getTabURL' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Runtime error:', chrome.runtime.lastError.message);
              resolve({ error: chrome.runtime.lastError.message });
            } else {
              resolve(response);
            }
          });
        });

        if (response.error) {
          throw new Error(response.error);
        }

        const currentURL = response.url;

        // Extract the full domain from the current URL
        const getDomainFromURL = (url) => {
          const domain = new URL(url).hostname;
          const parts = domain.split('.');
          if (parts.length > 2) {
            return parts.slice(-2).join('.');
          }
          return domain;
        };

        const domain = getDomainFromURL(currentURL);

        // Update the website name and supported status
        const websiteName = domain.split('.')[0];
        setCurrentWebsite(websiteName);
        setIsSupportedWebsite(supportedWebsites.includes(websiteName));

        if (supportedWebsites.includes(websiteName)) {
          // Fetch coupons from the API
          const response = await fetch(`http://127.0.0.1:5000/api/find-coupons/${domain}`);
          if (response.ok) {
            const data = await response.json();
            setCoupons(data); // Set the fetched coupons
          } else {
            console.error('Failed to fetch coupons:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching current tab URL:', error);
      }
    };

    fetchCurrentTabURL();
    // eslint-disable-next-line
  }, []);

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
        <h1 className="text-2xl font-bold absolute top-1 shadow-md text-white">Bag That</h1>
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
            {coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-gradient-to-r from-yellow-400/10 to-green-500/10 border border-white/10"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-400 font-bold text-base">
                      {coupon.verified ? 'Verified' : 'Unverified'}
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
                  <p className="text-white text-xs">{coupon.description}</p>
                </div>
              ))
            ) : (
              <p className="text-white text-sm">No coupons found for this website.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponFinder;