import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { applicationConfig } from "../../../application.config";

const useArtistWebSocket = (onArtistDeleted) => {
  const [stompClient, setStompClient] = useState(null);
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  useEffect(() => {
    const client = new Client({
      brokerURL: `${webSocketUrl}/ws`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setStompClient(client);
      client.subscribe(`/topic/artists`, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          if (parsedMessage) {
            onArtistDeleted(parsedMessage.artistId);
          } else {
            console.error("Invalid message format:", message.body);
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", message.body);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [onArtistDeleted]);

  return { stompClient };
};

export default useArtistWebSocket;
