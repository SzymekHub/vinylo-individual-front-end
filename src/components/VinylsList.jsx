import React from "react";
import VinylItem from "./VinylItem";

function VinylList(props) {
  const vinylItems = props.vinylsItems.vinyls; // Access the vinyls array correctly

  return (
    <ul>
      {vinylItems && vinylItems.length > 0 ? (
        vinylItems.map((vinylItem) => (
          <VinylItem key={vinylItem.id} vinylItem={vinylItem} />
        ))
      ) : (
        <li>No vinyls available</li>
      )}
    </ul>
  );
}

export default VinylList;
