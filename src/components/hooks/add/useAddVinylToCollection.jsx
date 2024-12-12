import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

const useAddVinylToCollection = (
  collectionVinylsItems,
  setCollectionVinylsItems
) => {
  const [loadingAddingCollection, setLoadingAddingCollection] = useState(false);
  const [errorAddingCollection, setErrorAddingCollection] = useState(null);
  const [addedVinylToCollectionMessage, setAddedVinylToCollectionMessage] =
    useState(""); // State for success message

  const addVinylToCollection = async (userId, vinylId) => {
    setLoadingAddingCollection(true);
    setErrorAddingCollection(null);
    setAddedVinylToCollectionMessage(""); // Clear any previous success message

    const newItem = {
      user_id: userId,
      vinyl_id: vinylId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/collections",
        newItem,
        {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }
      );

      if (response && response.data) {
        console.log("Vinyl added to collection successfully:", response.data);

        // Add the new item with the DB-assigned ID to the state
        const tempCollectionVinylsItems = {
          vinyls: [...(collectionVinylsItems?.vinyls || []), response.data], // Default to empty array if undefined
        };

        setCollectionVinylsItems(tempCollectionVinylsItems);

        // Set the success message
        setAddedVinylToCollectionMessage(
          "Vinyl added to collection successfully!"
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Error adding vinyl to collection: ", error.response);

        if (
          error.response.status === 400 &&
          error.response.data ===
            '400 BAD_REQUEST "Vinyl already in users collection"'
        ) {
          alert("Error: A vinyl already exists in users collection");
        } else {
          setErrorAddingCollection("An error occurred: " + error.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
        setErrorAddingCollection("An unexpected error occurred");
      }
    } finally {
      setLoadingAddingCollection(false);
    }
  };

  return {
    addVinylToCollection,
    loadingAddingCollection,
    errorAddingCollection,
    addedVinylToCollectionMessage,
  };
};

export default useAddVinylToCollection;
