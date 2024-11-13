import React, { useState, useEffect } from "react";
import VinylsList from "../components/collectionpage/VinylsList";
import VinylItem from "../components/collectionpage/VinylItem";
import { Disc3 } from "lucide-react";
import useFetchVinyls from "../components/hooks/useFetchVinyls";

function RecordCollectionPage() {
  const [selectedVinylId, setSelectedVinylId] = useState(null);

  const {
    vinylsItems,
    loading: loadingVinyls,
    error: fetchError,
  } = useFetchVinyls();

  const handleViewDetails = (id) => {
    setSelectedVinylId(id); // Update the selected vinyl ID to trigger the fetch
  };

  if (loadingVinyls) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>;

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">Record Collection</h1>
        <a
          href="/Vinyls"
          className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        >
          <Disc3 className="mr-2 h-5 w-5 text-emerald-50" />
          Add New Vinyl
        </a>
      </div>
      <div className="inner">
        <VinylsList
          vinylsItems={vinylsItems}
          onViewDetails={handleViewDetails} // Pass the handler here
        />
      </div>

      {/* Render Vinyl Details if a Vinyl is selected */}
      {selectedVinylId && vinylDetails && (
        <div className="mt-8">
          <VinylItem
            vinylItem={vinylDetails}
            loadingVinylDetails={loadingVinylDetails}
            fetchVinylDetailedError={fetchVinylDetailedError}
          />
        </div>
      )}
    </div>
  );
}

export default RecordCollectionPage;
