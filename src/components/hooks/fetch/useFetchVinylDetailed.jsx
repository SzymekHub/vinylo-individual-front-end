import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

export default function useFetchVinylDetailed() {
  const [vinylDetails, setVinylDetails] = useState(null);
  const [loadingVinylDetails, setLoadingVinylDetails] = useState(false);
  const [errorLoadingVinylDetails, setErrorLoadingVinylDetails] =
    useState(null);

  const fetchVinylDetailed = async (id) => {
    setLoadingVinylDetails(true);
    setErrorLoadingVinylDetails(null); // Reset error state before fetching
    try {
      const response = await axios.get(`http://localhost:8080/vinyls/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setVinylDetails(response.data); // Set the fetched vinyl details
    } catch (error) {
      setErrorLoadingVinylDetails(error.message); // Set only the error message
    } finally {
      setLoadingVinylDetails(false);
    }
  };

  return {
    vinylDetails,
    loadingVinylDetails,
    errorLoadingVinylDetails,
    fetchVinylDetailed,
  };
}
