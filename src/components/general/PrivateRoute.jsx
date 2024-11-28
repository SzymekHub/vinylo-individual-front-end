import React from "react";
import { Navigate } from "react-router-dom";
import TokenManager from "../hooks/TokenManager";

const PrivateRoute = ({ element, allowedRoles = [] }) => {
  const claims = TokenManager.getClaims();
  const roles = TokenManager.getRoles();

  const isAuthorized = roles.some((role) => allowedRoles.includes(role));

  if (!claims) {
    return <Navigate to="/Login" />; // Redirect to login if not authenticated
  }

  if (!isAuthorized) {
    return <Navigate to="/" />; // Redirect to home if unauthorized
  }

  return element; // Render the component if authorized
};

export default PrivateRoute;
