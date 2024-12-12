import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUserForm from "../components/registerPage/RegisterUserForm";
import useAddUser from "../components/hooks/add/useAddUser";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [usersItems, setUsersItems] = useState({ users: [] });
  const { registerUser, loading, error, registeredUserMessage } = useAddUser(
    usersItems,
    setUsersItems
  );

  const handleRegister = async (username, email, password) => {
    try {
      await registerUser(username, email, password);
      if (registeredUserMessage) {
        navigate("/login"); // Redirect to Login page on success
      }
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  return (
    <div>
      <RegisterUserForm
        onSubmit={handleRegister}
        loading={loading}
        error={error}
        registeredUserMessage={registeredUserMessage}
      />
    </div>
  );
};

export default RegisterPage;
