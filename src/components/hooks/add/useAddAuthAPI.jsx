import axios from "axios";
import tokenManager from "../TokenManager";

const useAddAuthAPI = {
  login: (username, password) =>
    axios
      .post("http://localhost:8080/login", { username, password })
      .then((response) => response.data.accessToken)
      .then((accessToken) => tokenManager.setAccessToken(accessToken)),
};

export default useAddAuthAPI;
