import { useState } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";
import useVinylEnums from "./useFetchEnums";

const useAddVinyl = (vinylsItems, setVinylsItems) => {
  const { enums, loading: enumsLoading, error: enumsError } = useVinylEnums();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedVinylMessage, setAddedVinylMessage] = useState(""); // State for success message

  const addVinyl = async (
    vinylType,
    artistId,
    title,
    speed,
    state,
    color,
    isReleased,
    description,
    spotifyAlbumId
  ) => {
    setLoading(true);
    setError(null);
    setAddedVinylMessage(""); // Clear any previous success message

    // Validate enums before submitting
    if (!enums || enumsLoading || enumsError) {
      setError("Enums data not loaded. Please try again.");
      setLoading(false);
      return;
    }

    const validateEnum = (value, key) => enums[key]?.includes(value);

    if (
      !validateEnum(vinylType, "vinylTypes") ||
      !validateEnum(speed, "speeds") ||
      !validateEnum(state, "states") ||
      !validateEnum(color, "colors")
    ) {
      setError("Invalid value(s) for one or more fields.");
      setLoading(false);
      return;
    }

    const newItem = {
      vinylType,
      artist_id: artistId, // Use artistId here
      title,
      speed,
      state,
      color,
      isReleased,
      description,
      spotifyAlbumId,
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
          error.response.data ===
            "Vinyl already exists with the same title and artist."
        ) {
          setError("A vinyl with the same title and artist already exists.");
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
