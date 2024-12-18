import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputVinyl from "../components/addvinylpage/InputVinyl";
import useAddVinyl from "../components/hooks/add/useAddVinyl";

function VinylsPage() {
  const navigate = useNavigate();
  const [vinylsItems, setVinylsItems] = useState({ vinyls: [] }); // Initialize empty state for vinyls

  const {
    addVinyl,
    loading: addingLoading,
    message: addedVinylMessage,
    error: addError,
  } = useAddVinyl(vinylsItems, setVinylsItems);

  const handleAddedVinyl = async (
    vinylType,
    artistId,
    title,
    speed,
    state,
    color,
    isReleased,
    description,
    spotifyAlbumId
  ) => {
    try {
      await addVinyl(
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
      navigate("/AllVinyls");
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="inner">
        <InputVinyl
          addItem={addVinyl}
          onSubmit={handleAddedVinyl}
          loading={addingLoading}
          error={addError}
          addedVinylMessage={addedVinylMessage}
        />
      </div>
    </div>
  );
}

export default VinylsPage;
