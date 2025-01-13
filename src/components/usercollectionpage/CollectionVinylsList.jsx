import React, { useState, useEffect } from "react";
import CollectionVinylItem from "./CollectionVinylItem";
import useCollectionWebSocket from "./useCollectionWebSocket";

function CollectionVinylsList({ collectionVinylsItems }) {
  const [vinylItems, setVinylItems] = useState(collectionVinylsItems);
  const { stompClient } = useCollectionWebSocket(setVinylItems);

  useEffect(() => {
    setVinylItems(collectionVinylsItems);
  }, [collectionVinylsItems]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
        Your Vinyl Collection
      </h2>
      <ul className="space-y-4">
        {vinylItems && vinylItems.length > 0 ? (
          vinylItems.map((collectionVinylItem) => (
            <CollectionVinylItem
              key={collectionVinylItem.id}
              collectionVinylItem={collectionVinylItem}
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
