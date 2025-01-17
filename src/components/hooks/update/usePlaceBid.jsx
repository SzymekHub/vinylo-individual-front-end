import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";
import { applicationConfig } from "../../../../application.config";

export default function usePlaceBid(auctionId) {
  const [loadingBid, setLoadingBid] = useState(false);
  const [errorBid, setErrorBid] = useState(null);
  const [successBid, setSuccessBid] = useState(null);
  const setAuctionDetailsRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  const placeBid = useCallback(
    async (bidAmount, userId) => {
      setLoadingBid(true);
      setErrorBid(null);
      setSuccessBid(null);
      let updatedAuction = null;

      try {
        const response = await axios.post(
          `${backendUrl}/bids/${auctionId}`,
          { bidAmount, userId },
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );
        // Handle successful update response if needed
        setSuccessBid("Bid placed successfully!");
        updatedAuction = response.data;
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          try {
            // Attempt to parse as JSON, if it fails, use the message as string
            setErrorBid(JSON.parse(JSON.stringify(error.response.data)));
          } catch (e) {
            setErrorBid(error.response.data);
          }
        } else {
          setErrorBid("An error occurred. Please try again later");
        }
      } finally {
        setLoadingBid(false);
      }
      return updatedAuction;
    },
    [auctionId]
  );
  // WebSocket connection setup
  useEffect(() => {
    if (!auctionId) return;
    const client = new Client({
      brokerURL: `${webSocketUrl}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      },
      onConnect: () => {
        // Subscribe to the  topic for all users
        client.subscribe(`/topic/auction/${auctionId}`, (message) => {
          // Update the auction details using the ref
          const updatedAuction = JSON.parse(message.body);
          if (setAuctionDetailsRef.current) {
            setAuctionDetailsRef.current(updatedAuction);
          }
        });
      },
      onDisconnect: () => {},
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [auctionId]);

  return {
    loadingBid,
    errorBid,
    successBid,
    placeBid,
  };
}
