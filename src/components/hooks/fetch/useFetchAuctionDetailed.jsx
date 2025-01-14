import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

export default function useFetchAuctionDetailed() {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loadingAuctionDetails, setLoadingAuctionDetails] = useState(false);
  const [errorLoadingAuctionDetails, setErrorLoadingAuctionDetails] =
    useState(null);

  const fetchAuctionDetailed = async (id) => {
    setLoadingAuctionDetails(true);
    setErrorLoadingAuctionDetails(null); // Reset error state before fetching
    try {
      const response = await axios.get(`http://localhost:8080/auctions/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setAuctionDetails(response.data); // Set the fetched auction details
    } catch (error) {
      setErrorLoadingAuctionDetails(error.response.data); // Set only the error message
    } finally {
      setLoadingAuctionDetails(false);
    }
  };

  return {
    auctionDetails,
    loadingAuctionDetails,
    errorLoadingAuctionDetails,
    fetchAuctionDetailed,
  };
}
