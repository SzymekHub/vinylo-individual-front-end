import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";
import { applicationConfig } from "../../../../application.config";

export default function useUpdateArtistPage(artistId, setArtistDetails) {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [successUpdate, setSuccessUpdate] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  const updateArtist = useCallback(
    async (bio) => {
      setLoadingUpdate(true);
      setErrorUpdate(null);
      setSuccessUpdate(null);

      try {
        const response = await axios.put(
          `${backendUrl}/artist/${artistId}`,
          { bio },
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );
        // Handle successful update response if needed
        setSuccessUpdate("Artist updated successfully!");
      } catch (error) {
        setErrorUpdate(
          error.response?.data?.message || "Failed to update Artist"
        );
      } finally {
        setLoadingUpdate(false);
      }
    },
    [artistId]
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
        client.subscribe(`/user/${userId}/topic/ArtistUpdated`, (message) => {
          const updatedArtist = JSON.parse(message.body);
          console.log("updatedArtist from ws", updatedArtist);
          setArtistDetails((prev) => ({
            ...prev,
            name: updatedArtist.name,
            bio: updatedArtist.bio,
          }));
          setSuccessUpdate("Artist updated successfully!");
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
  }, [artistId, setArtistDetails]);

  return {
    loadingUpdate,
    errorUpdate,
    successUpdate,
    updateArtist,
  };
}
