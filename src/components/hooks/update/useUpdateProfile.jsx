import { useState, useCallback } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

export default function useFetchProfile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [loadingProfileDetails, setLoadingProfileDetails] = useState(false);
  const [errorLoadingProfileDetails, setErrorLoadingProfileDetails] =
    useState(null);

  const fetchProfileDetailed = useCallback(async (id) => {
    setLoadingProfileDetails(true);
    setErrorLoadingProfileDetails(null);
    try {
      const response = await axios.get(`http://localhost:8080/profile/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setProfileDetails(response.data);
    } catch (error) {
      setErrorLoadingProfileDetails(error.message);
    } finally {
      setLoadingProfileDetails(false);
    }
  }, []);

  return {
    profileDetails,
    loadingProfileDetails,
    errorLoadingProfileDetails,
    fetchProfileDetailed,
  };
}
