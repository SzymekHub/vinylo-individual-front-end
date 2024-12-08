const MessageReceived = (props) => {
  return (
    <div className="mb-2 p-2 bg-emerald-700 rounded-md">
      {props.direct && (
        <span className="text-sm font-extrabold text-emerald-400">
          {" "}
          (Direct){" "}
        </span>
      )}
      <span className="font-semibold text-emerald-300">{props.from} : </span>
      <span className="text-emerald-100">{props.text}</span>
    </div>
  );
};

const ChatMessagesPlaceholder = (props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-400 mb-4">Messages:</h3>
      <div className="space-y-2">
        {props.messagesReceived
          .filter((message) => message.from !== props.username)
          .map((message) => (
            <MessageReceived
              key={message.id}
              from={message.from}
              direct={message.to === props.username}
              text={message.text}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessagesPlaceholder;
