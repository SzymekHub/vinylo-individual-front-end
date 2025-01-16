import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, ShoppingBasket, Disc3, HandCoins } from "lucide-react";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";
import Notification from "../Notification";

function PlaceBidForm({
  auctionDetails,
  profileDetails,
  onPlaceBid,
  loadingAuction,
  loadingBid,
  error,
  onClose,
  notification,
  closeNotification,
}) {
  const [bidAmount, setBidAmount] = useState("");
  const { vinylsItems } = useFetchVinyls();
  const [vinylName, setVinylName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onPlaceBid(bidAmount);
  };

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };
  useEffect(() => {
    setVinylName(
      vinylsItems.find((vinyl) => vinyl.id === auctionDetails?.vinyl_id)?.title
    );
  });

  const getPremiumInfo = () => {
    if (profileDetails?.user?.role === "PREMIUM") {
      return (
        <p className="text-sm text-emerald-200">You are a premium user.</p>
      );
    }

    return (
      <>
        <p className="text-sm text-emerald-200">
          You are a regular user, there is a 15 balance fee for each bid.
        </p>
        <Link
          to="/Upgrade"
          className="text-emerald-500 hover:text-emerald-300 transition-colors"
        >
          Upgrade to premium
        </Link>
      </>
    );
  };

  if (!profileDetails) {
    return <div className="text-white">Loading user data...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      <div className="w-full max-w-10xl h-[600px] bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            alt="Background"
            src="https://t2.genius.com/unsafe/1158x0/https%3A%2F%2Fimages.genius.com%2Fc8b7b648bd5b5061f747c2bb8e9973bd.1000x1000x1.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-emerald-400 drop-shadow-lg">
                Place Bid
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <ShoppingBasket
                size={20}
                className="text-center text-emerald-300 mr-2"
              />
              <span className="text-center text-emerald-300">
                Auction: <b>{auctionDetails?.title || "No Title available."}</b>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Disc3 size={20} className="text-center text-emerald-300 mr-2" />
              <span className="text-center text-emerald-300">
                Vinyl: <b>{vinylName || "No Vinyl available."}</b>
              </span>
            </div>

            <div className="flex items-center space-x-4 text-emerald-300">
              <div className="flex items-center space-x-2">
                <Wallet
                  size={20}
                  className="text-center text-emerald-300 mr-2"
                />
                <span className="text-center text-emerald-300">
                  Balance:{" "}
                  <b>
                    {profileDetails?.profile?.balance ||
                      "No balance available."}{" "}
                    credits
                  </b>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <HandCoins
                  size={20}
                  className="text-center text-emerald-300 mr-2"
                />
                <span className="text-center text-emerald-300">
                  Current Price:{" "}
                  {loadingAuction ? (
                    <b> Loading...</b>
                  ) : auctionDetails?.currentPrice != null ? (
                    <b>{auctionDetails?.currentPrice + " credits "}</b>
                  ) : (
                    <b> No current price available </b>
                  )}
                </span>
              </div>
            </div>
            {getPremiumInfo()}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="bidAmount"
                  className="block text-sm font-medium text-emerald-300"
                >
                  Bid Amount
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-900 text-white placeholder-gray-500"
                  placeholder="Enter your bid amount"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loadingBid}
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 disabled:opacity-50"
                >
                  {loadingBid ? "Placing Bid..." : "Place Bid"}
                </button>
                <button
                  onClick={onClose}
                  className="ml-2 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 shadow-lg hover:shadow-gray-400/50"
                >
                  Cancel
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceBidForm;
