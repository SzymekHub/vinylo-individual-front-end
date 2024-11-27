import { useState } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

const useAddVinyl = (vinylsItems, setVinylsItems) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedVinylMessage, setAddedVinylMessage] = useState(""); // State for success message

  const addVinyl = async (
    title,
    description,
    artistId, // Make sure artistId is passed correctly
    vinylType,
    isReleased
  ) => {
    setLoading(true);
    setError(null);
    setAddedVinylMessage(""); // Clear any previous success message

    const newItem = {
      title,
      description,
      artist_id: artistId, // Use artistId here
      vinylType,
      isReleased,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/vinyls",
        newItem,
        {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }
      );

      if (response && response.data) {
        console.log("Vinyl added successfully:", response.data);

        // Add the new item with the DB-assigned ID to the state
        const tempVinylsItems = {
          vinyls: [...(vinylsItems?.vinyls || []), response.data], // Default to empty array if undefined
        };

        setVinylsItems(tempVinylsItems);

        // Set the success message
        setAddedVinylMessage("Vinyl created successfully" + response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error adding vinyl:", error.response);

        if (
          error.response.status === 400 &&
          error.response.data === '400 BAD_REQUEST "Vinyl already exists"'
        ) {
          alert("Error: Duplicate vinyl item");
        } else {
          setError("An error occurred: " + error.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addVinyl, loading, error, addedVinylMessage };
};

export default useAddVinyl;
