import React, { useState, useEffect, useRef } from "react";
import { useStompClient } from "../components/hooks/useStompClient";
import ChatMessagesPlaceholder from "../components/chatpage/ChatMessagesPlaceholder";
import SendMessagePlaceholder from "../components/chatpage/SendMessagePlaceholder";
import UsernamePlaceholder from "../components/chatpage/UsernamePlaceholder";
import { v4 as uuidv4 } from "uuid";
import TokenManager from "../components/hooks/TokenManager";
import { applicationConfig } from "../../application.config";

function ChatPage() {
  const webSocketUrl = applicationConfig["backend-server-url-ws"];

  const [username, setUsername] = useState(TokenManager.getUsername);

  const { connect, sendMessage, messages } = useStompClient(
    `${webSocketUrl}/ws`
  );

  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (username && !isConnectedRef.current) {
      connect(username);
      isConnectedRef.current = true;
    }
  }, [username, connect]);

  const onUsernameInformed = (username) => {
    setUsername(username);
    connect(username);
  };

  const handleSendMessage = (newMessage) => {
    if (!username) {
      alert("Username is required.");
      return;
    }

    const payload = {
      id: uuidv4(),
      from: username,
      to: newMessage.to,
      text: newMessage.text,
    };

    const destination = payload.to
      ? `/user/${payload.to}/queue/inboxmessages`
      : "/topic/publicmessages";

    sendMessage(destination, payload);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
            Chat
          </h2>
          <UsernamePlaceholder
            username={username}
            onUsernameInformed={onUsernameInformed}
          />

          <ChatMessagesPlaceholder
            username={username}
            messagesReceived={messages}
          />

          <SendMessagePlaceholder
            username={username}
            onMessageSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
