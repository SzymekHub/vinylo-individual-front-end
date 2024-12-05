import React from "react";
import CollectionVinylItem from "./CollectionVinylItem";

function CollectionVinylsList({ collectionVinylsItems, onViewDetails }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
        Your Vinyl Collection
      </h2>
      <ul className="space-y-4">
        {collectionVinylsItems && collectionVinylsItems.length > 0 ? (
          collectionVinylsItems.map((collectionVinylItem) => (
            <CollectionVinylItem
              key={collectionVinylItem.id}
              collectionVinylItem={collectionVinylItem}
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

export default CollectionVinylsList;
