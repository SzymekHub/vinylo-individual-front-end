import { useState, useCallback, useRef } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

export default function useFetchAuctionDetailed() {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loadingAuctionDetails, setLoadingAuctionDetails] = useState(false);
  const [errorLoadingAuctionDetails, setErrorLoadingAuctionDetails] =
    useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  const fetchAuctionDetailed = useCallback(async (id) => {
    setLoadingAuctionDetails(true);
    setErrorLoadingAuctionDetails(null);
    try {
      const response = await axios.get(`${backendUrl}/auctions/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setAuctionDetails(response.data);
    } catch (error) {
      setErrorLoadingAuctionDetails(error.response.data);
    } finally {
      setLoadingAuctionDetails(false);
    }
  }, []);

  return {
    auctionDetails,
    setAuctionDetails,
    loadingAuctionDetails,
    errorLoadingAuctionDetails,
    fetchAuctionDetailed,
  };
}
