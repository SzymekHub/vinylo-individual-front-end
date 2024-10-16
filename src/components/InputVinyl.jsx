import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material"; // Import MUI components
import useFetchArtists from "./useFetchArtists"; // Import the artist fetching hook

function InputVinyl(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState(""); // State for artist selection
  const [vinylType, setVinylType] = useState("");
  const [isReleased, setIsReleased] = useState(false);

  const { artistsItems, loading, error } = useFetchArtists(); // Fetch artists

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Now passing the full artist object, not just the name
    props.addItem(title, description, artistName, vinylType, isReleased);

    // Clear the form fields
    setTitle("");
    setDescription("");
    setArtistName("");
    setVinylType("");
    setIsReleased(false);
  };

  const textChanged = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field based on the input name
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "vinylType":
        setVinylType(value);
        break;
      default:
        break;
    }
  };

  const handleArtistChange = (event, newValue) => {
    // Update to store the full artist object instead of just the name
    setArtistName(newValue);
  };

  const handleVinylTypeChange = (e) => {
    setVinylType(e.target.value); // Update vinylType state on selection
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

        {/* Artist Name Input with Autocomplete */}
        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Artist Name :
          </p>
          <label htmlFor="artistName" className="sr-only">
            Artist Name
          </label>
          <Autocomplete
            options={artistsItems} // Use full artist objects here
            getOptionLabel={(option) => option.name} // Display the artist name in the dropdown
            value={artistName}
            onChange={handleArtistChange}
            renderInput={(params) => (
              <TextField
                {...params}
                className="w-full rounded-lg bg-emerald-800 border-emerald-700 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              />
            )}
            sx={{ width: "100%" }}
          />
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Vinyl Type :</p>
          <select
            id="vinylType"
            name="vinylType"
            className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-300"
            value={vinylType}
            onChange={handleVinylTypeChange}
          >
            <option value="" className="text-emerald-300">
              Select vinyl type
            </option>
            <option value="LP" className="text-emerald-300">
              LP
            </option>
            <option value="EP" className="text-emerald-300">
              EP
            </option>
            <option value="Single" className="text-emerald-300">
              Single
            </option>
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
