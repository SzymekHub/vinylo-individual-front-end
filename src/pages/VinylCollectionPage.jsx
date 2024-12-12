import React, { useState } from "react";
import CollectionVinylsList from "../components/usercollectionpage/CollectionVinylsList";
import CollectionVinylItem from "../components/usercollectionpage/CollectionVinylItem";
import useFetchCollectionVinyls from "../components/hooks/fetch/useFetchVinylsCollections";
import TokenManager from "../components/hooks/TokenManager";

function VinylCollectionPage() {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;
  const [selectedVinylId, setSelectedVinylId] = useState(null);

  const {
    collectionVinylsItems,
    loading: loadingVinyls,
    error: fetchError,
  } = useFetchCollectionVinyls(userId);

  const handleViewDetails = (id) => {
    setSelectedVinylId(id); // Update the selected vinyl ID to trigger the fetch
  };

  if (loadingVinyls) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>;

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">Record Collection</h1>
      </div>
      <div className="inner">
        <CollectionVinylsList
          collectionVinylsItems={collectionVinylsItems}
          onViewDetails={handleViewDetails} // Pass the handler here
        />
      </div>

      {/* Render Vinyl Details if a Vinyl is selected */}
      {selectedVinylId && collectionVinylDetails && (
        <div className="mt-8">
          <CollectionVinylItem
            collectionVinylItem={collectionVinylDetails}
            loadingVinylDetails={loadingVinylDetails}
            fetchVinylDetailedError={fetchVinylDetailedError}
          />
        </div>
      )}
    </div>
  );
}

export default VinylCollectionPage;
