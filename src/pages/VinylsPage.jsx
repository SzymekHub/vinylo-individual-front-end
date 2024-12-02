import React, { useState, useEffect } from "react";
import InputVinyl from "../components/addvinylpage/InputVinyl";
import useAddVinyl from "../components/hooks/useAddVinyl";

function VinylsPage() {
  const [vinylsItems, setVinylsItems] = useState([]); // Initialize empty state for vinyls

  const {
    addVinyl,
    loading: addingLoading,
    message: addedVinylMessage,
    error: addError,
  } = useAddVinyl(vinylsItems, setVinylsItems);

  return (
    <div className="container">
      <div className="inner">
        <InputVinyl addItem={addVinyl} loading={addingLoading} />

        {addError && <div>Error adding vinyl: {addError}</div>}
        {addedVinylMessage && (
          <div> Successfully added a vinyl: {addedVinylMessage} </div>
        )}
      </div>
    </div>
  );
}

export default VinylsPage;
