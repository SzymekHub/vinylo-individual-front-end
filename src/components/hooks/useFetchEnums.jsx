import { useEffect, useState } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

const useVinylEnums = () => {
  const [enums, setEnums] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnums = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/vinyls/enums", {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        });
        setEnums(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnums();
  }, []);

  return { enums, loading, error };
};

export default useVinylEnums;
