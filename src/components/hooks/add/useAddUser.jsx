import { useState } from "react";
import axios from "axios";

const useAddUser = (usersItems, setUsersItems, onRegisterSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // State for success message
  const [registeredUserMessage, setRegisteredUserMessage] = useState("");
  const [username, setUsername] = useState("");

  const registerUser = async (username, email, password) => {
    setLoading(true);
    setError(null);
    // Clear any previous success message
    setRegisteredUserMessage("");
    // Store the username in the state
    setUsername(username);

    const newUser = {
      username,
      email,
      password,
      role: "REGULAR",
    };

    try {
      const response = await axios.post("http://localhost:8080/users", newUser);

      if (response && response.data) {
        // Add the new user with the DB-assigned ID to the state
        const tempUsersItems = {
          users: [...(usersItems?.users || []), response.data], // Default to empty array if undefined
        };

        setUsersItems(tempUsersItems);

        // Set the success message
        setRegisteredUserMessage(
          "User registered successfully: " + newUser.username
        );

        // Trigger the success callback
        onRegisterSuccess(newUser.username);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error registering user:", error.response);

        if (
          error.response.status === 400 &&
          error.response.data === '400 BAD_REQUEST "User already exists"'
        ) {
          alert("Error: Duplicate user");
        } else {
          setError("An error occurred " + error.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, registeredUserMessage, username };
};

export default useAddUser;
