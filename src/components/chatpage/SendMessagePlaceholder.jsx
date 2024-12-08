import { useState } from "react";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState("");
  const [destinationUsername, setDestinationUsername] = useState("");

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert("Please type a message!");
    }

    props.onMessageSend({ text: message, to: destinationUsername });
    setMessage("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-emerald-400 mb-2"
        >
          Message:
        </label>
        <input
          id="message"
          type="text"
          className="w-full px-3 py-2 bg-emerald-700 text-emerald-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Type your message"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="destUsername"
          className="block text-sm font-medium text-emerald-400 mb-2"
        >
          Destination:
        </label>
        <input
          id="destUsername"
          type="text"
          className="w-full px-3 py-2 bg-emerald-700 text-emerald-100 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(event) => setDestinationUsername(event.target.value)}
          placeholder="Enter recipient's username (optional)"
        />
      </div>
      <button
        onClick={onMessageSend}
        className="px-4 py-2 bg-emerald-600 text-emerald-100 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessagePlaceholder;
