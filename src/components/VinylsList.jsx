import React from "react";
import VinylItem from "./VinylItem";

function VinylList(props) {
  const vinylItems = props.vinylsItems.vinyls; // Access the vinyls array correctly

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
        Your Vinyl Collection
      </h2>
      <ul className="space-y-4">
        {vinylItems && vinylItems.length > 0 ? (
          vinylItems.map((vinylItem) => (
            <VinylItem key={vinylItem.id} vinylItem={vinylItem} />
          ))
        ) : (
          <li className="text-white">No vinyls available</li>
        )}
      </ul>
    </div>
  );
}

export default VinylList;
