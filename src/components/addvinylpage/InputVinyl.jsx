import React, { useState } from "react";
import useVinylEnums from "../hooks/fetch/useFetchEnums";
import ArtistAutocomplete from "./ArtistAutocomplete";

function InputVinyl(props) {
  const { enums, loading: enumsLoading, error: enumsError } = useVinylEnums();
  const [vinylType, setVinylType] = useState("");
  const [artistId, setArtistId] = useState(null); // Stores artist ID
  const [title, setTitle] = useState("");
  const [speed, setSpeed] = useState("");
  const [state, setState] = useState("");
  const [color, setColor] = useState("");
  const [isReleased, setIsReleased] = useState(false);
  const [description, setDescription] = useState("");
  const [spotifyAlbumId, setSpotifyAlbumId] = useState("");

  if (enumsLoading) return <p>Loading enums...</p>;
  if (enumsError) return <p>Error loading enums: {enumsError}</p>;

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    if (
      !artistId ||
      !title ||
      !description ||
      !vinylType ||
      !speed ||
      !state ||
      !color
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Log the artist id, not the whole object
    console.log("Selected Artist ID: ", artistId); // Logs the artist ID

    // Now passing the artistId instead of the full artist object
    props.addItem(
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

    // Clear the form fields
    setVinylType("");
    setArtistId(null);
    setTitle("");
    setSpeed("");
    setState("");
    setColor("");
    setIsReleased(false);
    setDescription("");
    setSpotifyAlbumId("");
  };

  const textChanged = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field based on the input name
    switch (name) {
      case "vinylType":
        setVinylType(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "speed":
        setSpeed(value);
        break;
      case "state":
        setState(value);
        break;
      case "color":
        setColor(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "spotifyAlbumId":
        setSpotifyAlbumId(value);
        break;
      default:
        break;
    }
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
            id="vinylType"
            name="vinylType"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
            value={vinylType}
            onChange={(e) => setVinylType(e.target.value)}
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
              value={title}
              onChange={textChanged}
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
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
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
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
              value={description}
              onChange={textChanged}
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
              onChange={textChanged}
            />
            <div className="text-emerald-400 text-sm text-right">
              {spotifyAlbumId.length}/666
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <button
            type="submit"
            className="inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            Add more vinyls!
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputVinyl;
