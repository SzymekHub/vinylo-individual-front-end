import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";

export default function useUpgradeProfile(userId) {
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [errorUpgrade, setErrorUpgrade] = useState(null);
  const [successUpgrade, setSuccessUpgrade] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const upgradeProfile = useCallback(async () => {
    setLoadingUpgrade(true);
    setErrorUpgrade(null);
    setSuccessUpgrade(null);

    try {
      const response = await axios.put(
        `http://localhost:8080/profile/upgrade/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TokenManager.getAccessToken()}`,
          },
        }
      );
      // Handle successful update response if needed
      setSuccessUpgrade("Account upgraded to premium!");
    } catch (error) {
      setErrorUpgrade(
        error.response?.data?.message || "Failed to upgrade account"
      );
    } finally {
      setLoadingUpgrade(false);
    }
  }, [userId]);

  // WebSocket connection setup
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      },
      onConnect: () => {
        // Subscribe to the user-specific topic
        client.subscribe(`/user/${userId}/topic/profileUpdated`, () => {
          setSuccessUpgrade("Profile Updated");
        });
      },
      onDisconnect: () => {
        setSuccessUpgrade(null);
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
    upgradeProfile,
  };
}
