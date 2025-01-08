import React, { useState, useEffect } from "react";
import CollectionVinylItem from "./CollectionVinylItem";
import { Client } from "@stomp/stompjs";
import TokenManager from "../hooks/TokenManager";

function CollectionVinylsList({ collectionVinylsItems }) {
  const [stompClient, setStompClient] = useState(null);
  const [vinylItems, setVinylItems] = useState(collectionVinylsItems);

  useEffect(() => {
    setVinylItems(collectionVinylsItems);
  }, [collectionVinylsItems]);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
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
            if (
              parsedMessage &&
              parsedMessage.vinylId &&
              parsedMessage.userId
            ) {
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
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
        Your Vinyl Collection
      </h2>
      <ul className="space-y-4">
        {vinylItems && vinylItems.length > 0 ? (
          vinylItems.map((collectionVinylItem) => (
            <CollectionVinylItem
              key={collectionVinylItem.id}
              collectionVinylItem={collectionVinylItem}
            />
          ))
        ) : (
          <li className="text-white">No vinyls available</li>
        )}
      </ul>
    </div>
  );
}

export default CollectionVinylsList;
