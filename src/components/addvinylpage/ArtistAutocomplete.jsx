import { Autocomplete, TextField } from "@mui/material";
import useFetchArtists from "../hooks/useFetchArtists";

const ArtistAutocomplete = ({ artistId, setArtistId }) => {
  const { filteredArtists, loading, error } = useFetchArtists();

  const handleArtistChange = (event, newValue) => {
    if (newValue) {
      setArtistId(newValue.id); // Set the artist ID
    } else {
      setArtistId(null); // Reset to null if no artist is selected
    }
  };

  if (loading) return <p>Loading artists...</p>;
  if (error) return <p>Error loading artists: {error.message}</p>;

  return (
    <Autocomplete
      id="artist_id"
      options={filteredArtists}
      getOptionLabel={(option) => option.name || ""}
      value={filteredArtists.find((artist) => artist.id === artistId) || null}
      onChange={handleArtistChange}
      isOptionEqualToValue={(option, value) =>
        option.artist_id === value.artist_id
      } // Ensures proper comparison
      renderInput={(params) => (
        <TextField
          {...params}
          className="w-full rounded-lg bg-emerald-800 border-emerald-700 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
          placeholder="Select artist"
        />
      )}
      sx={{ width: "100%" }}
    />
  );
};

export default ArtistAutocomplete;
