import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchProfile from "../hooks/fetch/useFetchProfile";
import usePlaceBid from "../hooks/update/usePlaceBid";
import Notification from "../Notification";
import TokenManager from "../hooks/TokenManager";

function AuctionActions({ auction, onAuctionUpdate }) {
  const userClaims = TokenManager.getClaims();
  const loggedInUserId = userClaims?.id;
  const isSeller = loggedInUserId === auction?.seller_id;
  const [isBidFormOpen, setIsBidFormOpen] = useState(false);
  const { profileDetails, fetchProfileDetailed } = useFetchProfile();
  const { loadingBid, errorBid, successBid, placeBid } = usePlaceBid(
    auction.id
  );
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    if (loggedInUserId) {
      fetchProfileDetailed(loggedInUserId);
    }
  }, [loggedInUserId, fetchProfileDetailed]);

  const openBidForm = () => setIsBidFormOpen(true);
  const closeBidForm = () => {
    setIsBidFormOpen(false);
    setBidAmount(""); // Reset bid amount when form is closed
  };
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await placeBid(bidAmount);
      closeBidForm();
    } catch (error) {
      // Error will be set by the hook.
    }
  };

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
    <div className="flex flex-col sm:flex-row gap-2">
      {isSeller ? (
        <button
          onClick={onAuctionUpdate}
          className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
        >
          {/* Changed to Edit Auction */}
          Edit Auction
        </button>
      ) : (
        <>
          <button
            onClick={openBidForm}
            className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
          >
            Place Bid
          </button>
          {isBidFormOpen && (
            <div className="mt-4 p-4 bg-gray-800 rounded-md">
              {successBid && (
                <Notification type="success" message={successBid} />
              )}
              {errorBid && <Notification type="error" message={errorBid} />}
              <p className="text-white">
                Current Balance:{" "}
                {profileDetails?.profile?.balance || "No balance available."}
              </p>
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingBid}
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-900 disabled:cursor-not-allowed"
                >
                  {loadingBid ? "Placing Bid..." : "Place Bid"}
                </button>
                <button
                  type="button"
                  onClick={closeBidForm}
                  className="mt-2 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AuctionActions;
