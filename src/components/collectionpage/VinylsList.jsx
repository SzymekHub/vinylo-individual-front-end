import React from "react";
import VinylItem from "./VinylItem";

function VinylList({ vinylsItems, onViewDetails }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
        Your Vinyl Collection
      </h2>
      <ul className="space-y-4">
        {vinylsItems && vinylsItems.length > 0 ? (
          vinylsItems.map((vinylItem) => (
            <VinylItem
              key={vinylItem.id}
              vinylItem={vinylItem}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <li className="text-white">No vinyls available</li>
        )}
      </ul>
    </div>
  );
}

export default VinylList;
