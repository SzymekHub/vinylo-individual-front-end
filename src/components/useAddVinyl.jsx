import { useState } from "react";
import axios from "axios";

const useAddVinyl = (vinylsItems, setVinylsItems) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addVinyl = async (
    title,
    description,
    artist,
    vinylType,
    isReleased
  ) => {
    setLoading(true);
    setError(null);

    const existingIds = vinylsItems.vinyls.map((vinyl) => vinyl.id);
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;

    const newItem = {
      id: maxId + 1,
      title,
      description,
      artist,
      vinylType,
      isReleased,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/vinyls",
        newItem
      );
      const saveId = response.data;
      newItem.id = saveId.id;

      // Update the state with the new item
      const tempVinylsItems = {
        vinyls: [...vinylsItems.vinyls, newItem],
      };
      setVinylsItems(tempVinylsItems);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === '400 BAD_REQUEST "Vinyl already exists"'
      ) {
        alert("Error: Duplicate vinyl item");
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
