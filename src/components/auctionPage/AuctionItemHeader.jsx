import React from "react";
import { useNavigate } from "react-router-dom";

function AuctionItemHeader({
  auctionItem,
  showDetails,
  showVinylDetails,
  handleViewDetails,
  handleViewVinylDetails,
  loadingVinylDetails,
  isEditMode,
}) {
  const navigate = useNavigate();
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

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
        showVinylDetails ? "mb-4" : ""
      }`}
    >
      <div className="w-4/5">
        <h3 className="font-bold text-2xl text-white mb-4">
          {auctionItem?.title}
        </h3>
        <p className="text-sm text-emerald-200 leading-relaxed">
          <strong>Current Price : </strong> $
          {auctionItem?.currentPrice?.toFixed(2)}
        </p>
        <p className="text-sm text-emerald-200 leading-relaxed">
          <strong>Ending : </strong>{" "}
          {formatDateWithoutSeconds(auctionItem?.endTime) +
            " (MM/DD/YYYY/HH:MM)" || "No end time available."}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        {!isEditMode && (
          <button
            onClick={handleViewDetails}
            className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
            disabled={false}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        )}
        {showDetails && !isEditMode && (
          <button
            className="flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
            onClick={handleViewVinylDetails}
            disabled={loadingVinylDetails}
          >
            {loadingVinylDetails
              ? "Loading..."
              : showVinylDetails
              ? "Hide Vinyl Details"
              : "View Vinyl Details"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuctionItemHeader;
