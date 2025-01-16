import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/fetch/useFetchUsers";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";

function AuctionDetailsSection({
  showDetails,
  auctionDetails,
  userId,
  loadingBid,
  auctionItem,
  toggleEditMode,
}) {
  const navigate = useNavigate();
  const [sellerUsername, setSellerUsername] = useState(null);
  const { vinylsItems } = useFetchVinyls();
  const [vinylName, setVinylName] = useState(null);
  const formatDateWithoutSeconds = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  const { getUser } = useFetchUsers();

  // Fetch seller's username whenever auctionDetails are loaded
  useEffect(() => {
    const fetchSellerUsername = async () => {
      if (auctionDetails?.seller_id) {
        try {
          const seller = await getUser(auctionDetails.seller_id);
          setSellerUsername(seller.username);
        } catch (error) {}
      }
    };
    fetchSellerUsername();

    setVinylName(
      vinylsItems.find((vinyl) => vinyl.id === auctionDetails?.vinyl_id)?.title
    );
  }, [auctionDetails, getUser, vinylsItems]);

  return (
    <>
      {showDetails && auctionDetails ? (
        <div className="mt-2">
          <h4 className="font-bold text-2xl text-white mb-4">
            {" "}
            Auction Details:{" "}
          </h4>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Seller : </strong>
            {sellerUsername || "No seller information available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Vinyl : </strong>
            {vinylName || " No vinyl information available."}
          </p>
          <div className="flex items-center space-x-4 text-emerald-300">
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>Starting Price :</strong> $
              {auctionDetails?.startingPrice?.toFixed(2) ||
                "No starting price available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Current Price : </strong> $
              {auctionItem?.currentPrice?.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Start Time :</strong>{" "}
            {formatDateWithoutSeconds(auctionDetails?.startTime) +
              " (MM/DD/YYYY/HH:MM)" || "No start time available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Ending : </strong>{" "}
            {formatDateWithoutSeconds(auctionDetails?.endTime) +
              " (MM/DD/YYYY/HH:MM)" || "No end time available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Description :</strong>{" "}
            {auctionDetails?.description || " No description available."}
          </p>
        </div>
      ) : null}
      {showDetails && auctionDetails && (
        <div className="mt-4">
          {userId === auctionDetails?.seller_id && (
            <button
              onClick={toggleEditMode}
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Update Auction
            </button>
          )}
          {/* Place bid button */}
          <button
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={() => navigate(`/bid/${auctionItem?.id}`)}
            disabled={loadingBid || userId === auctionDetails?.seller_id}
          >
            {loadingBid ? "Placing..." : "Place Bid"}
          </button>
        </div>
      )}
    </>
  );
}

export default AuctionDetailsSection;
