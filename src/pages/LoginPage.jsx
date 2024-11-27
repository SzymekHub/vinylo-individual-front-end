import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginpage/LoginForm";
import TokenManager from "../components/hooks/TokenManager";
import useAddAuthAPI from "../components/hooks/useAddAuthAPI";
import useFetchUsers from "../components/hooks/useFetchUsers";
import UserDetails from "../components/loginpage/UserDetails";

function LoginPage() {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = (username, password) => {
    useAddAuthAPI
      .login(username, password)
      .catch(() => alert("Login failed!"))
      .then((claims) => setClaims(claims))
      .then(getUserDetails)
      .catch((error) => console.error(error));
  };

  const getUserDetails = () => {
    const claims = TokenManager.getClaims();
    if (
      claims?.roles?.some((role) =>
        ["PREMIUM", "REGULAR", "ADMIN"].includes(role)
      ) &&
      claims?.id
    ) {
      useFetchUsers
        .getUser(claims.id)
        .then((user) => setUserDetails(user))
        .catch((error) => console.error(error));
    }
  };

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    setUserDetails(null);
  };

  useEffect(() => {
    getUserDetails();
  }, [claims]);

  return (
    <div>
      {claims ? (
        <div>
          <p>Welcome, {claims.sub}</p>
          {userDetails && <UserDetails userDetails={userDetails} />}
          <button onClick={handleLogout}>Logout</button>
          <br />
          <a href="/" target="_blank">
            Open in new Tab
          </a>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default LoginPage;
