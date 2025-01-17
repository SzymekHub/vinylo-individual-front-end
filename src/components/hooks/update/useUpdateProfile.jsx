import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";
import { applicationConfig } from "../../../../application.config";

export default function useUpdateProfilePage(userId, setProfileDetails) {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [successUpdate, setSuccessUpdate] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  const updateProfile = useCallback(
    async (bio, balance) => {
      setLoadingUpdate(true);
      setErrorUpdate(null);
      setSuccessUpdate(null);

      try {
        const response = await axios.put(
          `${backendUrl}/profile/${userId}`,
          { bio, balance },
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );
        // Handle successful update response if needed
        setSuccessUpdate("Profile updated successfully!");
      } catch (error) {
        setErrorUpdate(
          error.response?.data?.message || "Failed to update profile"
        );
      } finally {
        setLoadingUpdate(false);
      }
    },
    [userId]
  );

  // WebSocket connection setup
  useEffect(() => {
    const client = new Client({
      brokerURL: `${webSocketUrl}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      },
      onConnect: () => {
        // Subscribe to the user-specific topic
        client.subscribe(`/user/${userId}/topic/profileUpdated`, (message) => {
          const updatedProfile = JSON.parse(message.body);
          setProfileDetails((prev) => ({ ...prev, profile: updatedProfile }));
          setSuccessUpdate("Profile updated successfully!");
        });
      },
      onDisconnect: () => {
        setSuccessUpdate(null);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [userId, setProfileDetails]);

  return {
    loadingUpdate,
    errorUpdate,
    successUpdate,
    updateProfile,
  };
}
