import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const useAddArtist = (artistsItems, setArtistsItems) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedArtistMessage, setAddedArtistMessage] = useState(""); // State for success message
  const backendUrl = applicationConfig["backend-server-url"];

  const addArtist = async (name, bio) => {
    setLoading(true);
    setError(null);
    setAddedArtistMessage(""); // Clear any previous success message

    const newArtist = { name, bio };

    try {
      const response = await axios.post(`${backendUrl}/artist`, newArtist, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });

      if (response && response.data) {
        // Add the new item with the DB-assigned ID to the state
        const tempArtistsItems = {
          artists: [...(artistsItems?.artists || []), response.data], // Default to empty array if undefined
        };

        setArtistsItems(tempArtistsItems);

        // Set the success message
        setAddedArtistMessage("Artist created successfully: " + newArtist.name);
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data ===
            '400 BAD_REQUEST "Artist already exists with the same name"'
        ) {
          alert("Error: Duplicate artist");
        } else {
          setError("An error occurred: " + error.response.data);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addArtist, loading, error, addedArtistMessage };
};

export default useAddArtist;
