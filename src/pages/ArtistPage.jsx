import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputArtist from "../components/addartistpage/InputArtist";
import useAddArtist from "../components/hooks/add/useAddArtist";

function ArtistsPage() {
  const navigate = useNavigate();
  const [artistsItems, setArtistsItems] = useState({ artists: [] }); // Initialize empty state for artists

  const {
    addArtist,
    loading: addingLoading,
    error: addError,
    addedArtistMessage,
  } = useAddArtist(artistsItems, setArtistsItems);

  const handleAddedArtist = async (name, bio) => {
    try {
      await addArtist(name, bio);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="inner">
        <InputArtist
          addItem={addArtist}
          onSubmit={handleAddedArtist}
          loading={addingLoading}
          error={addError}
          addedVinylMessage={addedArtistMessage}
        />
      </div>
    </div>
  );
}

export default ArtistsPage;
