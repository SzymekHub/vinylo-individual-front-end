const UserDetails = ({ userDetails }) => {
  return (
    <div>
      <p>User Details:</p>
      <ul>
        <li>ID: {userDetails.id}</li>
        <li>Username: {userDetails.username}</li>
        <li>Email: {userDetails.email}</li>
        <li>Role: {userDetails.role}</li>
      </ul>
    </div>
  );
};

export default UserDetails;
