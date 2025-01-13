import React, { useState, useEffect } from "react";
import useFetchVinylsCollectionDetails from "../hooks/fetch/useFetchVinylsCollectionDetails";
import useFetchArtists from "../hooks/fetch/useFetchArtists";
import useVinylEnums from "../hooks/fetch/useFetchEnums";
import useFetchSpotifyEmbedUrl from "../spotify/useFetchSpotifyEmbedUrl";
import VinylItemActions from "./CollectionVinylItemActions";
import TokenManager from "../hooks/TokenManager";

function CollectionVinylItem({ collectionVinylItem }) {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;

  if (!collectionVinylItem) {
    return <div>Loading details...</div>;
  }

  var { vinylType, title, id, state, spotifyAlbumId } = collectionVinylItem;

  const [showDetails, setShowDetails] = useState(false);

  const {
    vinylCollectionDetails,
    loadingCollectionVinylDetails,
    errorLoadingCollectionVinylDetails,
    fetchVinylsCollectionDetails,
  } = useFetchVinylsCollectionDetails();

  const { embedUrl, loading, error, fetchEmbedUrl } = useFetchSpotifyEmbedUrl();
  const { artistsItems, loading: artistsLoading } = useFetchArtists();
  const { enums } = useVinylEnums();

  // Fetch details when needed
  useEffect(() => {
    if (showDetails && !vinylCollectionDetails) {
      console.log("Fetching collection details...");
      fetchVinylsCollectionDetails(userId, id);
      fetchEmbedUrl(collectionVinylItem.spotifyAlbumId);
    }
  }, [
    showDetails,
    userId,
    id,
    vinylCollectionDetails,
    fetchVinylsCollectionDetails,
    fetchEmbedUrl,
    collectionVinylItem.spotifyAlbumId,
  ]);

  const handleClickDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const artistName = artistsItems.find(
    (artist) => artist.id === vinylCollectionDetails?.artist_id
  )?.name;

  const getEnumDisplay = (key, value) =>
    enums?.[key]?.find((enumValue) => enumValue === value) || value;

  return (
    <li className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-lg p-6 flex flex-col gap-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-4/5">
          <h3 className="font-bold text-2xl text-white mb-4">
            {title || "No title available."}
          </h3>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Type: </strong>
            {getEnumDisplay("vinylTypes", collectionVinylItem.vinylType) ||
              "No types available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>State: </strong>
            {getEnumDisplay("states", collectionVinylItem.state) ||
              "No state available."}
          </p>
        </div>
        <VinylItemActions
          collectionVinylItem={collectionVinylItem}
          onDetailsClick={handleClickDetails}
        />
      </div>

      {errorLoadingCollectionVinylDetails && (
        <p className="mt-4 text-lg text-red-500 font-bold">
          {errorLoadingCollectionVinylDetails}
        </p>
      )}

      {showDetails && vinylCollectionDetails && (
        <div className="mt-2 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6">
          <h4 className="font-bold text-2xl text-white mb-4">Vinyl Details:</h4>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Title: </strong>
            {collectionVinylItem.title || "No title available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Type: </strong>
            {getEnumDisplay("vinylTypes", collectionVinylItem.vinylType) ||
              "No types available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>State: </strong>
            {getEnumDisplay("states", collectionVinylItem.state) ||
              "No state available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Artist: </strong> {artistName || "No artist available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Speed: </strong>
            {getEnumDisplay("speeds", vinylCollectionDetails.speed) ||
              "No Speed info available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Color: </strong>
            {getEnumDisplay("colors", vinylCollectionDetails.color) ||
              "No color info available."}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Released: </strong>
            {vinylCollectionDetails.isReleased ? "Yes" : "No"}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed break-words">
            <strong>Description: </strong>
            {vinylCollectionDetails.description || "No description available."}
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
                  src={`https://open.spotify.com/embed/album/${vinylCollectionDetails.spotifyAlbumId}?utm_source=generator`} //if i don't want colors add this line: &theme=9
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default CollectionVinylItem;
