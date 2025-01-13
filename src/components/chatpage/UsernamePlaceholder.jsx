const UsernamePlaceholder = (props) => {
  if (props.username) {
    return (
      <h2 className="text-sm font-semibold text-emerald-400 mb-2">
        Username:
        <span className="text-sm font-extrabold text-emerald-200 ml-2">
          {props.username}
        </span>
      </h2>
    );
  }

  return (
    <div className="mb-4">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-emerald-200 mb-2"
      >
        Username:
      </label>
      <input
        id="username"
        type="text"
        className="w-full px-3 py-2 bg-emerald-700 text-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onBlur={(event) => props.onUsernameInformed(event.target.value)}
        placeholder="Enter your username"
      />
    </div>
  );
};

export default UsernamePlaceholder;
