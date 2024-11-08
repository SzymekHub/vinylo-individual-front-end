import { useState, useEffect } from "react";
import axios from "axios";

const useFetchArtists = () => {
  const [artistsItems, setArtistsItems] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]); // Store filtered artists
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the artist data from the backend on component mount
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:8080/artist");
        setArtistsItems(response.data.artists);
        console.log("Fetched artists:", response.data); // Logs the response

        setFilteredArtists(response.data.artists);
        console.log("Fetched filtered artists:", response.data.artists); // Logs the response
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
