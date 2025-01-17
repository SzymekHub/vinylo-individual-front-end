import React, { useState, useCallback } from "react";
import ArtistList from "../components/allartistspage/ArtistList";
import ArtistItem from "../components/allartistspage/ArtistItem";
import useFetchArtistsPagination from "../components/hooks/fetch/useFetchArtistsPagination";
import useArtistWebSocket from "../components/allartistspage/useArtistWebSockets";

function Allartistspage() {
  const {
    artistsItems,
    loading: loadingArtists,
    error: fetchError,
    currentPage,
    totalPages,
    handlePageChange,
    // Removing setArtistsItems,
  } = useFetchArtistsPagination();

  const { stompClient } = useArtistWebSocket();

  // Create a ref to trigger the refresh of data.
  const [refresh, setRefresh] = useState(false);
  const handleArtistDelete = useCallback(() => {
    // Trigger a re-fetch of the artist data
    setRefresh((prev) => !prev);
    console.log("Artist delete detected, refreshing artist list!");
  }, []);

  const {
    artistsItems: updatedArtistsItems,
    loading: updatedLoadingArtists,
    error: updatedFetchError,
  } = useFetchArtistsPagination(refresh);

  if (loadingArtists || updatedLoadingArtists) return <div>Loading...</div>;
  if (fetchError || updatedFetchError)
    return (
      <div>
        Error loading Artists:{" "}
        {fetchError?.message || updatedFetchError?.message}
      </div>
    );

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-1xl font-bold">All Artists</h1>
      </div>

      <div className="inner">
        <ArtistList
          artistsItems={updatedArtistsItems}
          loading={updatedLoadingArtists}
          error={updatedFetchError}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          onArtistDelete={handleArtistDelete}
        />
      </div>
    </div>
  );
}

export default Allartistspage;
