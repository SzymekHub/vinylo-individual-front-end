import { useCallback } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const backendUrl = applicationConfig["backend-server-url"];

const useFetchUsers = () => {
  const getUser = useCallback(async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  return { getUser };
};

export default useFetchUsers;
