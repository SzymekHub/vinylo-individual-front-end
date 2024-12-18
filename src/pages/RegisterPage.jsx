import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUserForm from "../components/registerPage/RegisterUserForm";
import useAddUser from "../components/hooks/add/useAddUser";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [usersItems, setUsersItems] = useState({ users: [] });
  const { registerUser, loading, error, registeredUserMessage, username } =
    useAddUser(usersItems, setUsersItems);

  const handleRegister = async (username, email, password) => {
    try {
      await registerUser(username, email, password);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleSuccess = (username) => {
    // Success callback: Popup message and redirect to Login
    alert("Registration successful! " + username);
    navigate("/Login");
  };

  return (
    <div>
      <RegisterUserForm
        onSubmit={handleRegister}
        loading={loading}
        error={error}
        registeredUserMessage={registeredUserMessage}
        onRegisterSuccess={handleSuccess}
      />
    </div>
  );
};

export default RegisterPage;
