import { Autocomplete, TextField } from "@mui/material";
import useFetchArtists from "./useFetchArtists";
import { useState } from "react";

const ArtistAutocomplete = ({ artistName, setArtistName }) => {
  const { filteredArtists, loading, error } = useFetchArtists();

  const handleArtistChange = (event, newValue) => {
    setArtistName(newValue); // Set the selected artist object in InputVinyl
  };

  if (loading) return <p>Loading artists...</p>;
  if (error) return <p>Error loading artists: {error.message}</p>;

  return (
    <Autocomplete
      id="artist" 
      options={filteredArtists}
      getOptionLabel={(option) => option.name || ''}
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
  );
};

export default ArtistAutocomplete;
