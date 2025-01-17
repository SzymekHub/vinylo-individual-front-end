import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

export default function useFetchVinylDetailed() {
  const [vinylDetails, setVinylDetails] = useState(null);
  const [loadingVinylDetails, setLoadingVinylDetails] = useState(false);
  const [errorLoadingVinylDetails, setErrorLoadingVinylDetails] =
    useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  const fetchVinylDetailed = async (id) => {
    setLoadingVinylDetails(true);
    setErrorLoadingVinylDetails(null); // Reset error state before fetching
    try {
      const response = await axios.get(`${backendUrl}/vinyls/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setVinylDetails(response.data); // Set the fetched vinyl details
    } catch (error) {
      setErrorLoadingVinylDetails(error.response.data); // Set only the error message
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
