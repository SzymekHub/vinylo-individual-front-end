import React, { useState } from "react";
import useVinylEnums from "../hooks/fetch/useFetchEnums";
import ArtistAutocomplete from "./ArtistAutocomplete";
import useAddVinyl from "../hooks/add/useAddVinyl";

function InputVinyl() {
  const { enums, loading: enumsLoading, error: enumsError } = useVinylEnums();
  const [artistId, setArtistId] = useState(null); // Stores artist ID
  const [isReleased, setIsReleased] = useState(false);
  const [description, setDescription] = useState("");
  const [spotifyAlbumId, setSpotifyAlbumId] = useState("");

  const [vinylsItems, setVinylsItems] = useState({ vinyls: [] });
  const { addVinyl, loading, error, addedVinylMessage } = useAddVinyl(
    vinylsItems,
    setVinylsItems
  );

  if (enumsLoading) return <p>Loading enums...</p>;
  if (enumsError) return <p>Error loading enums: {enumsError}</p>;

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const vinylType = e.target.vinylType.value;
    const title = e.target.title.value;
    const speed = e.target.speed.value;
    const state = e.target.state.value;
    const color = e.target.color.value;
    const description = e.target.description.value;
    const spotifyAlbumId = e.target.spotifyAlbumId.value;

    addVinyl(
      vinylType,
      artistId,
      title,
      speed,
      state,
      color,
      isReleased,
      description,
      spotifyAlbumId
    );
  };

  const handleCheckboxChange = (e) => {
    setIsReleased(e.target.checked); // Update isReleased state based on checkbox
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold sm:text-3xl text-emerald-500">
        Add New Vinyl
      </h2>

      <form
        className="w-full mx-auto mb-0 mt-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Vinyl Type :</p>
          <select
            required
            id="vinylType"
            name="vinylType"
            data-cy="vinyl-type"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
          >
            <option value="">Select Vinyl Type</option>
            {enums?.vinylTypes?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* ArtistAutocomplete Component */}
        <ArtistAutocomplete artistId={artistId} setArtistId={setArtistId} />

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Title :</p>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter vinyl title"
              data-cy="title"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Vinyl Play Speed :
          </p>
          <select
            id="speed"
            name="speed"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
            data-cy="speed"
            required
          >
            <option value="">Select Speed</option>
            {enums?.speeds?.map((sp) => (
              <option key={sp} value={sp}>
                {sp}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Vinyl State :
          </p>
          <select
            id="state"
            name="state"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
            data-cy="state"
            required
          >
            <option value="">Select State</option>
            {enums?.states?.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Vinyl Color :
          </p>
          <select
            id="color"
            name="color"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
            data-cy="color"
            required
          >
            <option value="">Select Color</option>
            {enums?.colors?.map((clr) => (
              <option key={clr} value={clr}>
                {clr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isReleased}
              onChange={handleCheckboxChange}
              className="rounded border-emerald-700 bg-emerald-800 text-emerald-500 shadow-sm focus:ring-emerald-500"
              data-cy="is-released"
              required
            />
            <span className="ml-2 text-emerald-100">Is Released</span>
          </label>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Description :
          </p>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <div className="relative">
            <textarea
              type="text"
              name="description"
              className="w-full px-3 py-2 rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter vinyl description"
              rows="3"
              maxLength={150}
              value={description} // Bind value to state
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              data-cy="description"
              required
            />
            <div className="text-emerald-400 text-sm text-right">
              {description.length}/150
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Spotify Album ID :
          </p>
          <label htmlFor="spotifyAlbumId" className="sr-only">
            Spotify Album ID
          </label>
          <div className="relative">
            <textarea
              type="text"
              name="spotifyAlbumId"
              className="w-full px-3 py-2 rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter Spotify Album ID"
              rows="3"
              maxLength={666}
              value={spotifyAlbumId}
              onChange={(e) => setSpotifyAlbumId(e.target.value)} // Update state on change
              data-cy="spotify-album-id"
            />
            <div className="text-emerald-400 text-sm text-right">
              {spotifyAlbumId.length}/666
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between ">
          <button
            type="submit"
            data-cy="submit-vinyl"
            className="inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add more vinyls!"}
          </button>
        </div>
      </form>

      {/* Error and Success Messages */}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {addedVinylMessage && (
        <p className="mt-4 text-sm text-emerald-500">{addedVinylMessage}</p>
      )}
    </div>
  );
}

export default InputVinyl;
