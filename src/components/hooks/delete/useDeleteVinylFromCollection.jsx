import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

const useDeleteVinylFromCollection = () => {
  const [loadingDeletingCollection, setLoadingDeletingCollection] =
    useState(false);
  const [errorDeletingCollection, setErrorDeletingCollection] = useState(null);
  const [setCollectionVinylsItems, setUpdatedVinylsState] = useState(null);

  const registerSetCollectionVinylsItems = (setterFunction) => {
    setUpdatedVinylsState(setterFunction);
  };

  const deleteVinylFromCollection = async (vinylId) => {
    const userClaims = TokenManager.getClaims();
    const userId = userClaims?.id;
    // Don't proceed if userId or vinylId is missing
    if (!userId || !vinylId) return; // Don't proceed if userId or vinylId is missing

    setLoadingDeletingCollection(true);
    setErrorDeletingCollection(null);

    try {
      await axios.delete(
        `http://localhost:8080/collections/${vinylId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${TokenManager.getAccessToken()}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data ===
            '400 BAD_REQUEST "Vinyl is not in users collection"'
        ) {
          setErrorDeletingCollection(
            "Error: A vinyl does not exist in the user's collection."
          );
        } else {
          setErrorDeletingCollection(
            "An error occurred: " + error.response.data
          );
        }
      } else {
        setErrorDeletingCollection("An unexpected error occurred.");
      }
    } finally {
      setLoadingDeletingCollection(false);
    }
  };

  return {
    deleteVinylFromCollection,
    loadingDeletingCollection,
    errorDeletingCollection,
    registerSetCollectionVinylsItems,
  };
};

export default useDeleteVinylFromCollection;
