import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputAuction from "../components/auctionPage/InputAuction";
import useAddAuction from "../components/hooks/add/useAddAuction";

function SellAuctionPage() {
  const navigate = useNavigate();
  const [auctionsItems, setAuctionsItems] = useState({ auctions: [] }); // Initialize empty state for vinyls

  const {
    addAuction,
    loading: addingLoading,
    message: addedAuctionMessage,
    error: addError,
  } = useAddAuction(auctionsItems, setAuctionsItems);

  const handleAddedAuction = async (
    title,
    vinylId,
    sellerId,
    description,
    startingPrice,
    currentPrice,
    startTime,
    endTime
  ) => {
    try {
      await addAuction(
        title,
        vinylId,
        sellerId,
        description,
        startingPrice,
        currentPrice,
        startTime,
        endTime
      );
      navigate("/Auctions");
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="inner">
        <InputAuction addItem={addAuction} loading={addingLoading} />

        {addError && (
          <div className="text-red-500 mt-4">
            Error adding auction: {addError}
          </div>
        )}
        {addedAuctionMessage && (
          <div className="text-green-500 mt-4">
            Successfully added a auction: {addedAuctionMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellAuctionPage;
