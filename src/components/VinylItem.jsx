import React, { useState } from "react";

function VinylItem(props) {
  const { vinylType, title, description, artistName, isReleased } =
    props.vinylItem;

  //Added a state to toggle visibiltiy of details
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="bg-emerald-800 rounded-md p-4 flex justify-between items-center">
      <div className="w-4/5">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-emerald-300">{artistName}</p>
        <p className="text-sm text-emerald-400"> {vinylType}</p>

        {/* logic to show details only if View Details button is true */}
        {showDetails && (
          <div className="mt-2">
            <p className="text-sm text-emerald-400 break-words">
              Description: {description}
            </p>
            <p className="text-sm text-emerald-400">
              Released: {isReleased ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
      <button
        className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        onClick={handleToggleDetails} // Toggle details on click
      >
        {showDetails ? "Hide Details" : "View Details"}{" "}
        {/* Button text changes based on state */}
      </button>
    </li>
  );
}

export default VinylItem;
