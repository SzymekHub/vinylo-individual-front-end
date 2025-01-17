import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import useFetchVinyls from "../fetch/useFetchVinyls";
import { applicationConfig } from "../../../../application.config";

const useAddAuction = (auctionsItems, setAuctionsItems) => {
  const {
    vinyls,
    loading: vinylsLoading,
    error: vinylsError,
  } = useFetchVinyls();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedAuctionMessage, setAddedAuctionMessage] = useState(""); // State for success message
  const backendUrl = applicationConfig["backend-server-url"];

  const addAuction = async (
    title,
    vinylId,
    sellerId,
    description,
    startingPrice,
    currentPrice,
    startTime,
    endTime
  ) => {
    setLoading(true);
    setError(null);
    setAddedAuctionMessage(""); // Clear any previous success message

    // Validate VINYLS before submitting
    if (vinylsLoading || vinylsError) {
      setError("Vinyls data not loaded. Please try again.");
      setLoading(false);
      return;
    }

    const newAuction = {
      title,
      vinyl_id: vinylId,
      seller_id: sellerId,
      description,
      startingPrice,
      currentPrice,
      startTime,
      endTime,
    };

    try {
      const response = await axios.post(`${backendUrl}/auctions`, newAuction, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });

      if (response && response.data) {
        // Add the new item with the DB-assigned ID to the state
        const tempAuctionsItems = {
          auctions: [...(auctionsItems?.auctions || []), response.data], // Default to empty array if undefined
        };

        setAuctionsItems(tempAuctionsItems);

        // Set the success message
        setAddedAuctionMessage(
          "Auction created successfully " + newAuction.title
        );
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data ===
            '400 BAD_REQUEST "An auction like this already exists for this user"'
        ) {
          alert("Error: Duplicate auction");
        } else {
          setError("An error occurred: " + error.response.data);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addAuction, loading, error, addedAuctionMessage };
};

export default useAddAuction;
