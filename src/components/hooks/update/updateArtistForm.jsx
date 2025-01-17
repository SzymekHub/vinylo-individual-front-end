import React, { useState } from "react";

function UpdateArtistForm({ artist, updateArtist, toggleEditMode }) {
  const [name, setName] = useState(artist?.name || "");
  const [bio, setBio] = useState(artist?.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArtist(name, bio);
    toggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-emerald-200">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full rounded-md border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-emerald-200">
          Bio:
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 p-2 w-full rounded-md border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={toggleEditMode}
          className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default UpdateArtistForm;
