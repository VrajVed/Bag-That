import React, { useState } from "react";
import {
  SearchIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/outline";

const CouponFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("coupons");
  const [copiedCode, setCopiedCode] = useState(null);

  // Mock data for coupons
  const defaultCoupons = [
    {
      store: "Amazon",
      code: "SAVE20",
      description: "20% off on all electronics",
      verified: true,
      success_rate: "85%",
      lastUsed: "2 hours ago",
      savings: "Avg. $25",
    },
    {
      store: "Nike",
      code: "RUNNING10",
      description: "10% off on running shoes",
      verified: true,
      success_rate: "92%",
      lastUsed: "1 day ago",
      savings: "Avg. $15",
    },
    {
      store: "Best Buy",
      code: "TECH50",
      description: "$50 off orders over $500",
      verified: false,
      success_rate: "75%",
      lastUsed: "3 days ago",
      savings: "Avg. $50",
    },
  ];

  // Mock data for price history
  const priceHistory = {
    current: 299.99,
    lowest: 249.99,
    highest: 349.99,
    recommendation: "Wait for upcoming sale",
    predictedLowestDate: "Black Friday (Nov 24)",
  };

  // Filter coupons based on search term
  const filteredCoupons = defaultCoupons.filter(
    (coupon) =>
      coupon.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Copy to clipboard function
  const copyToClipboard = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => {
          setCopiedCode(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy code:", err);
      });
  };

  // ... imports and state management remain the same

  return (
    <div className="relative min-h-screen bg-gray-950 p-4 overflow-hidden">
      {/* Purple circle blur effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-[150px] animate-pulse"></div>

      <div className="max-w-2xl mx-auto pt-16 relative z-10">
        <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/30 backdrop-blur-sm shadow-xl">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coupons by store name.."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800/50 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-800">
            <button
              className={`px-4 py-2 ${
                activeTab === "coupons"
                  ? "border-b-2 border-purple-400 text-purple-300"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("coupons")}
            >
              <div className="flex items-center">
                <TagIcon className="h-5 w-5 mr-2" />
                Coupons
              </div>
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "price"
                  ? "border-b-2 border-purple-400 text-purple-300"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("price")}
            >
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Price History
              </div>
            </button>
          </div>

          {/* Content */}
          {activeTab === "coupons" ? (
            <div className="space-y-3">
              {filteredCoupons.map((coupon, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start bg-white/5 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ml-6 mr-2 hover:bg-white/10"
                >
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <p className="font-medium text-gray-200 text-sm">
                        {coupon.store}
                      </p>
                      {coupon.verified && (
                        <ShieldCheckIcon
                          className="h-4 w-4 text-purple-400 ml-2"
                          title="Verified Coupon"
                        />
                      )}
                    </div>
                    <p className="text-base font-semibold text-gray-100">
                      {coupon.code}
                    </p>
                    <p className="text-xs text-gray-400">
                      {coupon.description}
                    </p>
                    
                  </div>
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className={`${
                      copiedCode === coupon.code
                        ? "bg-purple-600 text-white"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                    } w-[70px] px-4 py-1.5 rounded text-xs font-medium transition duration-200 ml-3 flex items-center justify-center`}
                  >
                    {copiedCode === coupon.code ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 p-4 rounded-lg ml-6 mr-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Price</span>
                  <span className="text-lg font-semibold text-purple-300">
                    ${priceHistory.current}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lowest Price</span>
                  <span className="text-green-400">${priceHistory.lowest}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Highest Price</span>
                  <span className="text-red-400">${priceHistory.highest}</span>
                </div>
                <div className="mt-6 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-purple-200 font-medium mb-1">
                    Recommendation
                  </p>
                  <p className="text-gray-400 text-sm">
                    {priceHistory.recommendation}
                  </p>
                  <p className="text-purple-300 text-sm mt-2">
                    Expected lowest price on: {priceHistory.predictedLowestDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponFinder;
