import React, { useState } from "react";
import VinylsList from "../components/allvinylspage/VinylsList";
import VinylItem from "../components/allvinylspage/VinylItem";
import useFetchVinyls from "../components/hooks/useFetchVinyls";

function Allvinylspage() {
  const [selectedVinylId, setSelectedVinylId] = useState(null);

  const {
    vinylsItems,
    loading: loadingVinyls,
    error: fetchError,
    currentPage, // Get currentPage from useFetchVinyls
    totalPages, // Get totalPages from useFetchVinyls
    handlePageChange,
  } = useFetchVinyls();

  const handleViewDetails = (id) => {
    setSelectedVinylId(id); // Update the selected vinyl ID to trigger the fetch
  };

  if (loadingVinyls) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading vinyls: {fetchError.message}</div>;

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">All Vinyls</h1>
      </div>

      <div className="inner">
        <VinylsList
          vinylsItems={vinylsItems}
          loading={loadingVinyls}
          error={fetchError}
          currentPage={currentPage} // Pass currentPage
          totalPages={totalPages} // Pass totalPages
          handlePageChange={handlePageChange}
          onViewDetails={handleViewDetails}
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

export default Allvinylspage;
