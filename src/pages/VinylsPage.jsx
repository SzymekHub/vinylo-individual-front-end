import React, { useState, useEffect } from "react";
import InputVinyl from "../components/InputVinyl";
import useFetchVinyls from "../components/useFetchVinyls";
import useAddVinyl from "../components/useAddVinyl";

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
    error: addError,
  } = useAddVinyl(vinylsItems, setVinylsItems);

  if (loadingVinyls) return <div>Loading...</div>; // Show loading state
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>; // Handle errors

  return (
    <div className="container">
      <div className="inner">
        <InputVinyl addItem={addVinyl} loading={addingLoading} />
        {addError && <div>Error adding vinyl: {addError}</div>}
      </div>
    </div>
  );
}

export default VinylsPage;
