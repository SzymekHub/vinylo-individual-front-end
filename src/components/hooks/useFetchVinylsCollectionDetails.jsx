import { useState } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

export default function useFetchVinylsCollectionDetails() {
  const [vinylCollectionDetails, setVinylCollectionDetails] = useState(null);
  const [loadingVinylCollectionDetails, setLoadingVinylCollectionDetails] =
    useState(false);
  const [
    errorLoadingVinylCollectionDetails,
    setErrorLoadingVinylCollectionDetails,
  ] = useState(null);

  const fetchVinylsCollectionDetails = async (userId, id) => {
    setLoadingVinylCollectionDetails(true);
    setErrorLoadingVinylCollectionDetails(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/collections/userVinyl/${userId}/${id}`,
        {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }
      );
      setVinylCollectionDetails(response.data);
    } catch (error) {
      setErrorLoadingVinylCollectionDetails(error.message);
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
