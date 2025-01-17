import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";
import useRefreshToken from "../useRefreshToken";
import { useNavigate } from "react-router-dom";
import { applicationConfig } from "../../../../application.config";

export default function useUpgradeProfile(userId) {
  const navigate = useNavigate();
  const { refreshToken } = useRefreshToken();
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [errorUpgrade, setErrorUpgrade] = useState(null);
  const [successUpgrade, setSuccessUpgrade] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  const upgradeProfile = useCallback(async () => {
    setLoadingUpgrade(true);
    setErrorUpgrade(null);
    setSuccessUpgrade(null);
    setProfileUpdated(null);

    try {
      const response = await axios.put(
        `${backendUrl}/profile/upgrade/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManager.getAccessToken()}`,
          },
        }
      );
      if (response.status === 200) {
        const isTokenRefreshed = await refreshToken();
        if (isTokenRefreshed) {
          setSuccessUpgrade("Account upgraded to premium successfully!");
          // Redirect to profile page after successful upgrade.
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        }
      }
    } catch (error) {
      setErrorUpgrade(
        error.response?.data?.message || "Failed to upgrade account"
      );
    } finally {
      setLoadingUpgrade(false);
    }
  }, [userId, refreshToken, navigate]);

  // WebSocket connection setup
  useEffect(() => {
    if (!userId) return;
    const client = new Client({
      brokerURL: `${webSocketUrl}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      },
      onConnect: () => {
        // Subscribe to the user-specific topic
        client.subscribe(`/user/${userId}/topic/profileUpdated`, (message) => {
          // Handle the profile update message
          setProfileUpdated(JSON.parse(message.body));
        });
      },
      onDisconnect: () => {
        setProfileUpdated(null);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [userId]);

  return {
    loadingUpgrade,
    errorUpgrade,
    successUpgrade,
    profileUpdated,
    upgradeProfile,
  };
}
