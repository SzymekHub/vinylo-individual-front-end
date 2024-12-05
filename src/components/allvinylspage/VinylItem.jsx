import React, { useState } from "react";
import useFetchVinylDetailed from "../hooks/useFetchVinylDetailed";
import useFetchArtists from "../hooks/useFetchArtists";
import useVinylEnums from "../hooks/useFetchEnums";
import useFetchSpotifyEmbedUrl from "../spotify/useFetchSpotifyEmbedUrl";

function VinylItem({ vinylItem }) {
  if (!vinylItem) {
    return <div>Loading details...</div>; // or any other fallback UI
  }

  var { vinylType, title, id, state, spotifyAlbumId } = vinylItem;

  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);
  const [vinylDetails, setVinylDetails] = useState(null);
  const { embedUrl, loading, error, fetchEmbedUrl } = useFetchSpotifyEmbedUrl();
  const { artistsItems, loading: artistsLoading } = useFetchArtists();
  const { enums } = useVinylEnums();

  const handleClickDetails = async () => {
    if (!showDetails && !vinylDetails) {
      await useFetchVinylDetailed(id, setVinylDetails);
      await fetchEmbedUrl(vinylItem.spotifyAlbumId); // Fetch Spotify embed URL
    }
    setShowDetails((prevState) => !prevState);
  };

  // Find the artist name by matching artist_id with fetched artists
  const artistName = artistsItems.find(
    (artist) => artist.id === vinylDetails?.artist_id
  )?.name;

  const getEnumDisplay = (key, value) =>
    enums?.[key]?.find((enumValue) => enumValue === value) || value;

  return (
    <li className="bg-emerald-800 rounded-md p-4 flex justify-between items-center">
      <div className="w-4/5">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-emerald-400">
          {getEnumDisplay("vinylTypes", vinylItem.vinylType)}
        </p>
        <p className="text-sm text-emerald-400">
          {getEnumDisplay("states", vinylItem.state)}
        </p>

        {/* Display the details only if showDetails is true */}
        {showDetails && vinylDetails && (
          <div className="mt-2">
            <p className="text-sm text-emerald-400 break-words">
              Artist: {artistName || " No artist available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              Speed:{" "}
              {getEnumDisplay("speeds", vinylDetails.speed) ||
                " No Speed info available."}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              color:{" "}
              {getEnumDisplay("colors", vinylDetails.color) ||
                " No color info available."}
            </p>
            <p className="text-sm text-emerald-400">
              Released: {vinylDetails.isReleased ? "Yes" : "No"}
            </p>
            <p className="text-sm text-emerald-400 break-words">
              Description:{" "}
              {vinylDetails.description || " No description available."}
            </p>
            <div className="mt-4">
              {loading ? (
                <p>Loading Spotify embed...</p>
              ) : error ? (
                <p className="text-red-400">Failed to load Spotify embed</p>
              ) : (
                embedUrl && (
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={`https://open.spotify.com/embed/album/${vinylDetails.spotifyAlbumId}?utm_source=generator`} //if i don't want colors add this line: &theme=9
                    width="50%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )
              )}
            </div>
          </div>
        )}
      </div>
      <button
        className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        onClick={handleClickDetails} // Toggle details and pass ID
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
    </li>
  );
}

export default VinylItem;
