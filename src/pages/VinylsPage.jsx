import React, { useState, useEffect } from "react";
import InputVinyl from "../components/addvinylpage/InputVinyl";
import useFetchVinyls from "../components/hooks/useFetchVinyls";
import useAddVinyl from "../components/hooks/useAddVinyl";

function VinylsPage() {
  const {
    vinylsItems: fetchedVinyls,
    loading: loadingVinyls,
    error: fetchError,
  } = useFetchVinyls();

  const [vinylsItems, setVinylsItems] = useState(fetchedVinyls);

  // Update vinylsItems state whenever fetchedVinyls changes
  useEffect(() => {
    setVinylsItems(fetchedVinyls);
  }, [fetchedVinyls]);

  const {
    addVinyl,
    loading: addingLoading,
    message: addedVinylMessage,
    error: addError,
  } = useAddVinyl(vinylsItems, setVinylsItems);

  if (loadingVinyls) return <div>Loading...</div>; // Show loading state
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>; // Handle errors

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
