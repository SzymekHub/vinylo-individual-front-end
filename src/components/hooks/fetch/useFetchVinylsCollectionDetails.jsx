import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

export default function useFetchVinylsCollectionDetails() {
  const [vinylCollectionDetails, setVinylCollectionDetails] = useState(null);
  const [loadingVinylCollectionDetails, setLoadingVinylCollectionDetails] =
    useState(false);
  const [
    errorLoadingVinylCollectionDetails,
    setErrorLoadingVinylCollectionDetails,
  ] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  const fetchVinylsCollectionDetails = async (userId, id) => {
    setLoadingVinylCollectionDetails(true);
    setErrorLoadingVinylCollectionDetails(null);
    try {
      const response = await axios.get(
        `${backendUrl}/collections/userVinyl/${userId}/${id}`,
        {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }
      );
      setVinylCollectionDetails(response.data);
    } catch (error) {
      setErrorLoadingVinylCollectionDetails(error.response.data);
    } finally {
      setLoadingVinylCollectionDetails(false);
    }
  };

  return {
    vinylCollectionDetails,
    loadingVinylCollectionDetails,
    errorLoadingVinylCollectionDetails,
    fetchVinylsCollectionDetails,
  };
}
