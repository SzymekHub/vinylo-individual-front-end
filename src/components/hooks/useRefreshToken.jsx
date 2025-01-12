import { useState } from "react";
import axios from "axios";
import TokenManager from "./TokenManager";

const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManager.getAccessToken()}`,
          },
        }
      );

      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        TokenManager.setAccessToken(newAccessToken);
        setLoading(false);
        return true;
      } else {
        setError("Failed to refresh token.");
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      setError("Failed to refresh token.");
      setLoading(false);
      return false;
    }
  };

  return { refreshToken, loading, error };
};

export default useRefreshToken;
