import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginpage/LoginForm";
import TokenManager from "../components/hooks/TokenManager";
import useAddAuthAPI from "../components/hooks/useAddAuthAPI";
import useFetchUsers from "../components/hooks/useFetchUsers";
import UserDetails from "../components/loginpage/UserDetails";

function LoginPage({ setClaims }) {
  const [claims, setLocalClaims] = useState(TokenManager.getClaims());
  const [userDetails, setUserDetails] = useState(null);
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
        console.error(error);
      });
  };

  // const getUserDetails = () => {
  //   const claims = TokenManager.getClaims();
  //   if (
  //     claims?.roles?.some((role) =>
  //       ["PREMIUM", "REGULAR", "ADMIN"].includes(role)
  //     ) &&
  //     claims?.id
  //   ) {
  //     useFetchUsers
  //       .getUser(claims.id)
  //       .then((user) => setUserDetails(user))
  //       .catch((error) => console.error(error));
  //   }
  // };

  // useEffect(() => {
  //   if (claims) getUserDetails();
  // }, [claims]);

  // if (claims) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
