import React, { useState, useEffect } from "react";
import useFetchAuctionDetailed from "../hooks/fetch/useFetchAuctionDetailed";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";
import useFetchUsers from "../hooks/fetch/useFetchUsers";

function AuctionItem({ auctionItem }) {
  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);
  const [sellerUsername, setSellerUsername] = useState(null);

  // Fetch auction details using custom hook
  const {
    auctionDetails,
    loadingAuctionDetails,
    errorLoadingAuctionDetails,
    fetchAuctionDetailed,
  } = useFetchAuctionDetailed();

  const { vinylsItems } = useFetchVinyls();

  const handleViewDetails = async () => {
    if (!showDetails && !auctionDetails) {
      await fetchAuctionDetailed(auctionItem.id); // Fetch detailed auction info
    }
    setShowDetails((prevState) => !prevState); // Toggle details view
  };

  // Fetch seller's username whenever auctionDetails are loaded
  useEffect(() => {
    const fetchSellerUsername = async () => {
      if (auctionDetails?.seller_id) {
        try {
          const seller = await useFetchUsers.getUser(auctionDetails.seller_id);
          setSellerUsername(seller.username);
        } catch (error) {
          console.error("Failed to fetch seller details:", error);
        }
      }
    };

    fetchSellerUsername();
  }, [auctionDetails]);

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

  //find the vinyl and user name by matching vinyl_id and user_id with fetched vinyls and users.
  const vinylName = vinylsItems.find(
    (vinyl) => vinyl.id === auctionDetails?.vinyl_id
  )?.title;

  if (!auctionItem) {
    return <div>Loading details...</div>;
  }

  return (
    <li className="bg-emerald-800 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="w-4/5">
        {/* Auction Summary */}
        <h3 className="font-semibold text-white">{auctionItem.title}</h3>
        <p className="text-sm text-emerald-400">
          Current Price: ${auctionItem.currentPrice.toFixed(2)}
        </p>
        <p className="text-sm text-emerald-400">
          Ending: {new Date(auctionItem.endTime).toLocaleString()}
        </p>

        {/* Error and Success Messages for auction details */}
        {errorLoadingAuctionDetails && (
          <p className="mt-4 text-lg text-red-500 font-bold">
            {errorLoadingAuctionDetails}
          </p>
        )}

        {/* Display Detailed Auction info only if showDetails is true and auctionDetails are fetched */}
        {showDetails && auctionDetails && (
          <div className="mt-2">
            <p className="text-sm text-emerald-400 break-words">
              <strong>Description:</strong>
              {auctionDetails.description || " No description available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>Starting Price:</strong> $
              {auctionDetails.startingPrice.toFixed(2) ||
                "No starting price available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>Current Price:</strong> $
              {auctionDetails.currentPrice.toFixed(2) ||
                "No current price available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>Start Time :</strong>{" "}
              {formatDateWithoutSeconds(auctionDetails.startTime) +
                " (MM/DD/YYYY/HH:MM)" || "No start time available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>End Time :</strong>{" "}
              {formatDateWithoutSeconds(auctionDetails.endTime) +
                " (MM/DD/YYYY/HH:MM)" || "No end time available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>Seller: </strong>{" "}
              {sellerUsername || "No seller information available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              <strong>Vinyl: </strong>
              {vinylName || " No vinyl information available."}
            </p>
          </div>
        )}
      </div>
      {/* View Details Button */}
      <button
        onClick={handleViewDetails}
        className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition"
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
    </li>
  );
}

export default AuctionItem;
