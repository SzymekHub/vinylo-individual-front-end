import * as jwt_decode from "jwt-decode";

const TokenManager = {
  getAccessToken: () => {
    const token = sessionStorage.getItem("accessToken");
    return token;
  },
  getClaims: () => {
    if (!sessionStorage.getItem("claims")) {
      return undefined;
    }
    return JSON.parse(sessionStorage.getItem("claims"));
  },
  getUsername: () => {
    const claims = TokenManager.getClaims();
    return claims ? claims.sub : undefined;
  },
  getRoles: () => {
    const claims = TokenManager.getClaims();
    return claims?.roles || []; // Assuming roles are stored as an array in the token
  },

  setAccessToken: (token) => {
    sessionStorage.setItem("accessToken", token);
    const claims = jwt_decode.jwtDecode(token);
    sessionStorage.setItem("claims", JSON.stringify(claims));
    return claims;
  },
  clear: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("claims");
  },
};

export default TokenManager;
