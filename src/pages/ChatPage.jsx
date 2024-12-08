import React, { useState } from "react";
import { useStompClient } from "../components/hooks/useStompClient";
import ChatMessagesPlaceholder from "../components/chatpage/ChatMessagesPlaceholder";
import SendMessagePlaceholder from "../components/chatpage/SendMessagePlaceholder";
import UsernamePlaceholder from "../components/chatpage/UsernamePlaceholder";
import { v4 as uuidv4 } from "uuid";

function ChatPage() {
  const [username, setUsername] = useState();
  const { connect, sendMessage, messages } = useStompClient(
    "http://localhost:8080/ws",
    username
  );

  const onUsernameInformed = (username) => {
    setUsername(username);
    connect(username);
  };

  const handleSendMessage = (newMessage) => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
          Chat
        </h2>
        <UsernamePlaceholder
          username={username}
          onUsernameInformed={onUsernameInformed}
        />
        <SendMessagePlaceholder
          username={username}
          onMessageSend={handleSendMessage}
        />
        <ChatMessagesPlaceholder
          username={username}
          messagesReceived={messages}
        />
      </div>
    </div>
  );
}

export default ChatPage;
