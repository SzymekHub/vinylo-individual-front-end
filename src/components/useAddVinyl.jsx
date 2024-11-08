import { useState } from "react";
import axios from "axios";

const useAddVinyl = (vinylsItems, setVinylsItems) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addVinyl = async (
    title,
    description,
    artistId,  // Make sure artistId is passed correctly
    vinylType,
    isReleased
  ) => {
    setLoading(true);
    setError(null);
  
    const newItem = {
      title,
      description,
      artist: artistId,  // Use artistId here
      vinylType,
      isReleased,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/vinyls", newItem);
  
      if (response && response.data) {
        console.log("Vinyl added successfully:", response.data);
  
        // Add the new item with the DB-assigned ID to the state
        const tempVinylsItems = {
          vinyls: [...vinylsItems.vinyls, response.data], // Add the entire response with the ID
        };
        setVinylsItems(tempVinylsItems);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error adding vinyl:", error.response.data);
  
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

  return { addVinyl, loading, error };
};

export default useAddVinyl;