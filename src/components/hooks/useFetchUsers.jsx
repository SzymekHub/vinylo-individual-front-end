import axios from "axios";
import tokenManager from "../hooks/TokenManager";

const useFetchUsers = {
  getUser: (id) =>
    axios
      .get(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: `Bearer ${tokenManager.getAccessToken()}` },
      })
      .then((response) => response.data),
};

export default useFetchUsers;
