import { useCallback } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";

const useFetchUsers = () => {
  const getUser = useCallback(async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`, {
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
