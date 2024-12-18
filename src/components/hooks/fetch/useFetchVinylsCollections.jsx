import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

const useFetchCollectionVinyls = (userId) => {
  const [collectionVinylsItems, setCollectionVinylsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchCollectionVinyls = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/collections/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );

        setCollectionVinylsItems(response.data.vinyls);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionVinyls();
  }, [userId]); // Add userId as a dependency here

  return { collectionVinylsItems, loading, error };
};

export default useFetchCollectionVinyls;
