import React, { useState } from "react";
import useFetchVinylDetailed from "../hooks/useFetchVinylDetailed";
import useFetchArtists from "../hooks/useFetchArtists";

function VinylItem({ vinylItem }) {
  if (!vinylItem) {
    return <div>Loading details...</div>; // or any other fallback UI
  }

  var { vinylType, title, id } = vinylItem;

  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);
  const [vinylDetails, setVinylDetails] = useState(false);
  const { artistsItems, loading: artistsLoading } = useFetchArtists();

  const handleClickDetails = async () => {
    await useFetchVinylDetailed(id, setVinylDetails);
    // Toggle visibility of details
    setShowDetails((prevState) => !prevState);
  };

  // Find the artist name by matching artist_id with fetched artists
  const artistName = artistsItems.find(
    (artist) => artist.id === vinylDetails?.artist_id
  )?.name;

  return (
    <li className="bg-emerald-800 rounded-md p-4 flex justify-between items-center">
      <div className="w-4/5">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-emerald-400">{vinylType}</p>

        {/* Display the details only if showDetails is true */}
        {showDetails && (
          <div className="mt-2">
            <p className="text-sm text-emerald-400 break-words">
              Artist: {artistName || " No artist available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              Description:{" "}
              {vinylDetails.description || " No description available."}
            </p>
            <p className="text-sm text-emerald-400">
              Released: {vinylDetails.isReleased ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
      <button
        className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        onClick={handleClickDetails} // Toggle details and pass ID
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
    </li>
  );
}

export default VinylItem;
