import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginpage/LoginForm";
import TokenManager from "../components/hooks/TokenManager";
import useAddAuthAPI from "../components/hooks/add/useAddAuthAPI";

function LoginPage({ setClaims }) {
  const [claims, setLocalClaims] = useState(TokenManager.getClaims());
  const navigate = useNavigate();

  useEffect(() => {
    if (claims) {
      // Redirect to the homepage if the user is already logged in
      navigate("/", { replace: true });
    }
  }, [claims, navigate]);

  const handleLogin = (username, password) => {
    useAddAuthAPI
      .login(username, password)
      .then((claims) => {
        setLocalClaims(claims);
        setClaims(claims);

        // return getUserDetails();
      })
      .catch((error) => {
        alert("Login failed!");
      });
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
