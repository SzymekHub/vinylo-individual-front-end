import { useEffect, useState } from "react";
import axios from "axios";
import { applicationConfig } from "../../../../application.config";
import TokenManager from "../TokenManager";

const useVinylEnums = () => {
  const [enums, setEnums] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  useEffect(() => {
    const fetchEnums = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/vinyls/enums`, {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        });
        setEnums(response.data);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchEnums();
  }, []);

  return { enums, loading, error };
};

export default useVinylEnums;
