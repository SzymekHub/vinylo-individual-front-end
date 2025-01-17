import { Autocomplete, TextField, Typography } from "@mui/material";
import useFetchArtists from "../hooks/fetch/useFetchArtists";

const AlreadyHereArtists = () => {
  const { filteredArtists, loading, error } = useFetchArtists();

  if (loading) return <Typography>Loading artists...</Typography>;
  if (error)
    return <Typography>Error loading artists: {error.message}</Typography>;

  return (
    <Autocomplete
      options={filteredArtists}
      getOptionLabel={(option) => option.name || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          className="w-full rounded-lg bg-emerald-800 border-emerald-700 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
          placeholder="Already here Artists"
        />
      )}
      disableClearable
      openOnFocus
      sx={{ width: "100%" }}
      onChange={() => {}} // Prevents changing the value
      value={null} // Ensures no value is selected
    />
  );
};

export default AlreadyHereArtists;
