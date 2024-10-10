import { useState, useEffect } from "react";
import axios from "axios";

const useFetchVinyls = () => {
  const [vinylsItems, setVinylsItems] = useState({ vinyls: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vinyls");
        setVinylsItems(response.data);
        console.log("Fetched vinyls:", response.data); // Logs the response
      } catch (error) {
        console.error("There was an error fetching the vinyls: ", error);
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
