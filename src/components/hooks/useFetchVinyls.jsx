import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

const useFetchVinyls = () => {
  const [vinylsItems, setVinylsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vinyls", {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        });

        setVinylsItems(response.data.vinyls);
        console.log("Fetched vinyls:", response.data); // Logs the response
      } catch (error) {
        console.error("There was an error fetching the vinyls:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVinyls();
  }, []);

  return { vinylsItems, loading, error };
};

export default useFetchVinyls;
