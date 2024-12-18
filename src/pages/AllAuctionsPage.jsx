import React, { useState } from "react";
import AuctionList from "../components/auctionPage/AuctionList";
import AuctionItem from "../components/auctionPage/AuctionItem";
import useFetchAuctions from "../components/hooks/fetch/useFetchAuction";

function AllAuctionsPage() {
  const [selectedAuctionId, setSelectedAuctionId] = useState(null);

  const {
    auctionsItems,
    loading: loadingAuctions,
    error: fetchError,
    currentPage, // Get currentPage from useFetchAuctions
    totalPages, // Get totalPages from useFetchAuctions
    handlePageChange,
  } = useFetchAuctions();

  const handleViewDetails = (id) => {
    setSelectedAuctionId(id); // Update the selected auction ID to trigger the fetch
  };

  if (loadingAuctions) return <div>Loading...</div>;
  if (fetchError)
    return <div>Error loading auctions: {fetchError.message}</div>;

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">All Auctions</h1>
      </div>

      <div className="inner">
        <AuctionList
          auctionsItems={auctionsItems}
          loading={loadingAuctions}
          error={fetchError}
          currentPage={currentPage} // Pass currentPage
          totalPages={totalPages} // Pass totalPages
          handlePageChange={handlePageChange}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Render Vinyl Details if a auction is selected */}
      {selectedAuctionId && auctionDetails && (
        <div className="mt-8">
          <AuctionItem
            auctionItem={auctionDetails}
            loadingAuctionDetails={loadingAuctionDetails}
            fetchAuctionDetailedError={fetchAuctionDetailedError}
          />
        </div>
      )}
    </div>
  );
}

export default AllAuctionsPage;
