import { useState, useCallback } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

export default function useFetchProfile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [loadingProfileDetails, setLoadingProfileDetails] = useState(false);
  const [errorLoadingProfileDetails, setErrorLoadingProfileDetails] =
    useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  const fetchProfileDetailed = useCallback(async (id) => {
    setLoadingProfileDetails(true);
    setErrorLoadingProfileDetails(null);
    try {
      const response = await axios.get(`${backendUrl}/profile/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      setProfileDetails(response.data);
    } catch (error) {
      setErrorLoadingProfileDetails(error.response.data);
    } finally {
      setLoadingProfileDetails(false);
    }
  }, []);

  return {
    profileDetails,
    setProfileDetails,
    loadingProfileDetails,
    errorLoadingProfileDetails,
    fetchProfileDetailed,
  };
}
