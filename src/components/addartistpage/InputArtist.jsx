import React, { useState } from "react";
import useAddArtist from "../hooks/add/useAddArtist";
import AlreadyHereArtists from "./AlreadyHereArtists";

function InputArtist() {
  const [bio, setBio] = useState("");

  const [artistsItems, setArtistsItems] = useState({ artists: [] });
  const { addArtist, loading, error, addedArtistMessage } = useAddArtist(
    artistsItems,
    setArtistsItems
  );

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const name = e.target.name.value;
    const bio = e.target.bio.value;

    addArtist(name, bio);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold sm:text-3xl text-emerald-500">
        Add New Artist
      </h2>

      <form
        className="w-full mx-auto mb-0 mt-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          {/* ArtistAutocomplete Component */}
          <AlreadyHereArtists />

          <p className="font-bold sm:text-1xl text-emerald-500">
            Artist Name :
          </p>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter Artists Name"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Bio :</p>
          <label htmlFor="bio" className="sr-only">
            bio
          </label>
          <div className="relative">
            <textarea
              type="text"
              name="bio"
              className="w-full px-3 py-2 rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter Artists bio"
              rows="3"
              maxLength={150}
              value={bio} // Bind value to state
              onChange={(e) => setBio(e.target.value)} // Update state on change
              required
            />
            <div className="text-emerald-400 text-sm text-right">
              {bio.length}/150
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between ">
          <button
            type="submit"
            className="inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add more Artists!"}
          </button>
        </div>
      </form>

      {/* Error and Success Messages */}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {addedArtistMessage && (
        <p className="mt-4 text-sm text-emerald-500">{addedArtistMessage}</p>
      )}
    </div>
  );
}

export default InputArtist;
