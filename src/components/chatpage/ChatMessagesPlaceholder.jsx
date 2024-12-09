const MessageReceived = (props) => {
  return (
    <div
      className={`mb-2 p-2 rounded-md break-words overflow-hidden max-w-full ${
        props.isCurrentUser ? "bg-emerald-500" : "bg-emerald-700"
      }`}
    >
      {props.direct && (
        <span className="text-sm font-extrabold text-emerald-400">
          (Direct){" "}
        </span>
      )}
      {props.isCurrentUser ? (
        <span className="font-semibold text-emerald-100">(You): </span>
      ) : (
        <span className="font-semibold text-emerald-300">{props.from}: </span>
      )}
      <span className="text-emerald-100">{props.text}</span>
    </div>
  );
};

const ChatMessagesPlaceholder = (props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-400 mb-4">Messages:</h3>
      <div className="space-y-2">
        {props.messagesReceived.map((message) => {
          const isCurrentUser = message.from === props.username;
          const isDirectMessage =
            isCurrentUser || message.to === props.username;

          // Show the message only if it's public or relevant to the user
          if (isDirectMessage || !message.to) {
            return (
              <MessageReceived
                key={message.id}
                from={message.from}
                text={message.text}
                isCurrentUser={isCurrentUser}
                direct={!!message.to}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ChatMessagesPlaceholder;
