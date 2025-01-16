import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { Client } from "@stomp/stompjs";

export default function useUpdateAuction(auctionId, setAuctionDetails) {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);
  const [successUpdate, setSuccessUpdate] = useState(null);
  const setAuctionDetailsRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const fetchAuctionDetailedRef = useRef(null);

  useEffect(() => {
    setAuctionDetailsRef.current = setAuctionDetails;
  }, [setAuctionDetails]);

  const updateAuction = useCallback(
    async (
      title,
      description,
      startingPrice,
      currentPrice,
      startTime,
      endTime
    ) => {
      setLoadingUpdate(true);
      setErrorUpdate(null);
      setSuccessUpdate(null);

      try {
        const response = await axios.put(
          `http://localhost:8080/auctions/${auctionId}`,
          {
            title,
            description,
            startingPrice,
            currentPrice,
            startTime,
            endTime,
          },
          {
            headers: {
              Authorization: `Bearer ${TokenManager.getAccessToken()}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        setErrorUpdate(
          error.response?.data?.message || "Failed to update auction"
        );
      } finally {
        setLoadingUpdate(false);
      }
    },
    [auctionId]
  );
  // WebSocket connection setup
  useEffect(() => {
    if (!auctionId) return;
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
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
            if (fetchAuctionDetailedRef.current) {
              fetchAuctionDetailedRef.current(auctionId);
            }
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

  const setFetchAuctionDetailed = (fetchAuctionDetailed) => {
    fetchAuctionDetailedRef.current = fetchAuctionDetailed;
  };
  return {
    loadingUpdate,
    errorUpdate,
    successUpdate,
    updateAuction,
    setFetchAuctionDetailed,
  };
}
