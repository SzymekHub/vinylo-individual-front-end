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
    setDestinationUsername("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Message Field */}
        <div className="mb-4 md:mb-0 md:w-1/2">
          <label
            htmlFor="message"
            className="block text-sm font-medium py-3 text-emerald-200 mb-2"
          >
            Message:
          </label>
          <textarea
            id="message"
            type="text"
            className="w-full px-3 py-2 bg-emerald-700 text-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            placeholder="Type your message"
          />
        </div>

        {/* Direct Message Field */}
        <div className="md:w-1/2">
          <label
            htmlFor="destUsername"
            className="block text-sm font-medium py-3 text-emerald-200 mb-2"
          >
            Direct Message:
          </label>
          <textarea
            id="destUsername"
            type="text"
            className="w-full px-3 py-2 bg-emerald-700 text-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(event) => setDestinationUsername(event.target.value)}
            value={destinationUsername}
            placeholder="Enter recipient's username (optional)"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={onMessageSend}
          className="px-4 py-2 bg-emerald-600 text-emerald-200 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default SendMessagePlaceholder;
