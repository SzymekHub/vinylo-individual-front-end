import axios from "axios";
import tokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const backendUrl = applicationConfig["backend-server-url"];

const useAddAuthAPI = {
  login: (username, password) =>
    axios
      .post(`${backendUrl}/login`, { username, password })
      .then((response) => response.data.accessToken)
      .then((accessToken) => tokenManager.setAccessToken(accessToken)),
};

export default useAddAuthAPI;
