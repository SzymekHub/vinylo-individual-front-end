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
    <li className="bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/3 relative">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1503683759663-762ec9716627?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>
        {/* Right Content Section */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-4/5">
              <h3 className="font-bold text-2xl text-white mb-4">
                {title || "No title available."}
              </h3>
              <div className="flex items-center space-x-4 text-emerald-300">
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Type: </strong>
                  {getEnumDisplay(
                    "vinylTypes",
                    collectionVinylItem.vinylType
                  ) || "No types available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>State: </strong>
                  {getEnumDisplay("states", collectionVinylItem.state) ||
                    "No state available."}
                </p>
              </div>
            </div>
            <VinylItemActions
              collectionVinylItem={collectionVinylItem}
              onDetailsClick={handleClickDetails}
              showDetails={showDetails} // Pass showDetails here
            />
          </div>

          {errorLoadingCollectionVinylDetails && (
            <p className="mt-4 text-lg text-red-500 font-bold">
              {errorLoadingCollectionVinylDetails}
            </p>
          )}

          {showDetails && vinylCollectionDetails && (
            <div className="h-300 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold text-2xl text-white mb-4">
                Vinyl Details:
              </h4>
              <div className="flex items-center space-x-4 text-emerald-300">
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Title: </strong>
                  {collectionVinylItem.title || "No title available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Artist: </strong>{" "}
                  {artistName || "No artist available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Released: </strong>
                  {vinylCollectionDetails.isReleased ? "Yes" : "No"}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Color: </strong>
                  {getEnumDisplay("colors", vinylCollectionDetails.color) ||
                    "No color info available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>State: </strong>
                  {getEnumDisplay("states", collectionVinylItem.state) ||
                    "No state available."}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-emerald-300">
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Type: </strong>
                  {getEnumDisplay(
                    "vinylTypes",
                    collectionVinylItem.vinylType
                  ) || "No types available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Speed: </strong>
                  {getEnumDisplay("speeds", vinylCollectionDetails.speed) ||
                    "No Speed info available."}
                </p>
              </div>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Description: </strong>
                {vinylCollectionDetails.description ||
                  "No description available."}
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
      </div>
    </li>
  );
}

export default CollectionVinylItem;
