import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const useFetchVinyls = () => {
  const [vinylsItems, setVinylsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  // Initialize to 1 to avoid errors
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const backendUrl = applicationConfig["backend-server-url"];

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/vinyls?page=${currentPage}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );

        setVinylsItems(response.data.vinyls);
        setTotalPages(response.data.totalPages); // Directly set total pages
      } catch (error) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchVinyls();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return {
    vinylsItems,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useFetchVinyls;
