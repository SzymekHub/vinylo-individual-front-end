import React from "react";
import { Navigate } from "react-router-dom";
import TokenManager from "../hooks/TokenManager";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = !!TokenManager.getClaims();
  return isLoggedIn ? element : <Navigate to="/Login" />;
};

export default PrivateRoute;
