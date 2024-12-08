import { useState } from "react";
import { Client } from "@stomp/stompjs";

export const useStompClient = (url) => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const connect = (username) => {
    // stomp client over websockets
    const client = new Client({
      brokerURL: url,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      // subscribe to the backend public topic
      client.subscribe("/topic/publicmessages", (data) => {
        console.log(data);
        onMessageReceived(data);
      });

      // subscribe to the backend "private" topic
      client.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
        onMessageReceived(data);
      });
    };

    // initiate client
    client.activate();

    // maintain the client for sending and receiving
    setStompClient(client);
  };

  // send the data using Stomp
  const sendMessage = (destination, payload) => {
    if (!stompClient) {
      console.error("Stomp client is not connected");
      return;
    }
    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
    });
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { connect, sendMessage, messages };
};
