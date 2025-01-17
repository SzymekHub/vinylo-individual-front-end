import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import TokenManager from "../hooks/TokenManager";
import { applicationConfig } from "../../../application.config";

const useCollectionWebSocket = (setVinylItems) => {
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
      const userId = TokenManager.getClaims()?.id;
      if (userId) {
        client.subscribe(`/topic/collections/${userId}`, (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            if (parsedMessage) {
              setVinylItems((prevCollectionVinylsItems) => {
                if (
                  !prevCollectionVinylsItems ||
                  !prevCollectionVinylsItems.length
                ) {
                  return prevCollectionVinylsItems;
                }
                const updatedVinyls = prevCollectionVinylsItems.filter(
                  (vinyl) => vinyl.id !== parsedMessage.vinylId
                );

                const newState = updatedVinyls;

                return newState;
              });
            } else {
              console.error("Invalid message format:", message.body);
            }
          } catch (error) {
            console.error("Failed to parse WebSocket message:", message.body);
          }
        });
      }
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
  }, [setVinylItems]);

  return { stompClient };
};

export default useCollectionWebSocket;
