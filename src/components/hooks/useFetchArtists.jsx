import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

const useFetchArtists = () => {
  const [artistsItems, setArtistsItems] = useState([]);
  // Store filtered artists
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the artist data from the backend on component mount
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:8080/artist", {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        });
        setArtistsItems(response.data.artists);
        setFilteredArtists(response.data.artists); // Filter based on certain conditions if needed
      } catch (error) {
        console.error("There was an error fetching the artists: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artistsItems, filteredArtists, setFilteredArtists, loading, error };
};

export default useFetchArtists;
