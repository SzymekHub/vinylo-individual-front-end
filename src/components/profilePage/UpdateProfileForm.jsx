import React, { useState } from "react";

function UpdateProfileForm({ profile, updateProfile, toggleEditMode }) {
  const [bio, setBio] = useState(profile?.bio || "");
  const [balance, setBalance] = useState(profile?.balance || "");

  const handleBioChange = (e) => setBio(e.target.value);
  const handleBalanceChange = (e) => setBalance(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(bio, balance);
    toggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-emerald-300"
        >
          Bio
        </label>
        <input
          type="text"
          id="bio"
          value={bio}
          data-cy="bio"
          onChange={handleBioChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="balance"
          className="block text-sm font-medium text-emerald-300"
        >
          Balance
        </label>
        <input
          type="number"
          id="balance"
          data-cy="balance"
          value={balance}
          onChange={handleBalanceChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <button
        type="submit"
        data-cy="submit-profile"
        className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Update Profile
      </button>
    </form>
  );
}

export default UpdateProfileForm;
