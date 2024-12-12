import React, { useState } from "react";
import useFetchVinylDetailed from "../hooks/fetch/useFetchVinylDetailed";
import useFetchArtists from "../hooks/fetch/useFetchArtists";
import useVinylEnums from "../hooks/fetch/useFetchEnums";
import useFetchSpotifyEmbedUrl from "../spotify/useFetchSpotifyEmbedUrl";
import useAddVinylToCollection from "../hooks/add/useAddVinylToCollection";
import TokenManager from "../hooks/TokenManager";

function VinylItem({ vinylItem }) {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;

  if (!vinylItem) {
    return <div>Loading details...</div>;
  }

  var { vinylType, title, id, state, spotifyAlbumId } = vinylItem;

  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);

  // Fetch vinyl details using custom hook
  const {
    vinylDetails,
    loadingVinylDetails,
    errorLoadingVinylDetails,
    fetchVinylDetailed,
  } = useFetchVinylDetailed();

  const [collectionVinylsItems, setCollectionVinylsItems] = useState({
    vinyls: [],
  });

  const {
    addVinylToCollection,
    loadingAddingCollection,
    errorAddingCollection,
    addedVinylToCollectionMessage,
  } = useAddVinylToCollection(collectionVinylsItems, setCollectionVinylsItems);

  const { embedUrl, loading, error, fetchEmbedUrl } = useFetchSpotifyEmbedUrl();
  const { artistsItems, loading: artistsLoading } = useFetchArtists();
  const { enums } = useVinylEnums();

  const handleClickDetails = async () => {
    if (!showDetails && !vinylDetails) {
      await fetchVinylDetailed(id);
      await fetchEmbedUrl(vinylItem.spotifyAlbumId); // Fetch Spotify embed URL
    }
    setShowDetails((prevState) => !prevState);
  };

  const handleAddToCollection = () => {
    addVinylToCollection(userId, id);
  };

  // Find the artist name by matching artist_id with fetched artists
  const artistName = artistsItems.find(
    (artist) => artist.id === vinylDetails?.artist_id
  )?.name;

  const getEnumDisplay = (key, value) =>
    enums?.[key]?.find((enumValue) => enumValue === value) || value;

  return (
    <li className="bg-emerald-800 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="w-4/5">
        {/* Error and Success Messages for adding to collection */}
        {errorAddingCollection && (
          <p className="mt-4 text-lg text-red-500 font-bold">
            {errorAddingCollection}
          </p>
        )}
        {addedVinylToCollectionMessage && (
          <p className="mt-4 text-lg text-emerald-500 font-bold">
            {addedVinylToCollectionMessage}
          </p>
        )}
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-emerald-400">
          {getEnumDisplay("vinylTypes", vinylItem.vinylType)}
        </p>
        <p className="text-sm text-emerald-400">
          {getEnumDisplay("states", vinylItem.state)}
        </p>

        {/* Error and Success Messages for vinyl details */}
        {errorLoadingVinylDetails && (
          <p className="mt-4 text-lg text-red-500 font-bold">
            {errorLoadingVinylDetails}
          </p>
        )}

        {/* Display the details only if showDetails is true and vinylDetails are fetched */}
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
                    width="100%"
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
        onClick={handleClickDetails}
        disabled={loadingVinylDetails}
      >
        {loadingVinylDetails
          ? "Loading..."
          : showDetails
          ? "Hide Details"
          : "View Details"}
      </button>

      <button
        className="flex items-center px-3 py-2 rounded-md hover:bg-emerald-600 text-emerald-50 hover:text-emerald-900 transition-colors"
        onClick={handleAddToCollection}
        disabled={loadingAddingCollection}
      >
        {loadingAddingCollection ? "Adding..." : "Add to Collection"}
      </button>
    </li>
  );
}

export default VinylItem;
