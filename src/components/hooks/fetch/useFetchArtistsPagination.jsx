import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const useFetchArtistsPagination = (refresh) => {
  const [artistsItems, setArtistsItems] = useState([]);
  // Store filtered artists
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  // Initialize to 1 to avoid errors
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const backendUrl = applicationConfig["backend-server-url"];

  useEffect(() => {
    // Fetch the artist data from the backend on component mount
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/artist?page=${currentPage}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );
        setArtistsItems(response.data.artists);
        setFilteredArtists(response.data.artists); // Filter based on certain conditions if needed
        setTotalPages(response.data.totalPages); // Directly set total pages
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [currentPage, refresh]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return {
    artistsItems,
    filteredArtists,
    setFilteredArtists,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useFetchArtistsPagination;
