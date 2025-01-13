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

  const { vinylType, title, id, state, spotifyAlbumId } = vinylItem;

  const [showDetails, setShowDetails] = useState(false);
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
      await fetchEmbedUrl(vinylItem.spotifyAlbumId);
    }
    setShowDetails((prevState) => !prevState);
  };

  const handleAddToCollection = () => {
    addVinylToCollection(userId, id);
  };

  const artistName = artistsItems.find(
    (artist) => artist.id === vinylDetails?.artist_id
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
            src="https://images.unsplash.com/photo-1618972678240-e1b00a6454ba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1498145645178-ab2c7cebc433?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  {getEnumDisplay("vinylTypes", vinylItem.vinylType) ||
                    "No types available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>State: </strong>
                  {getEnumDisplay("states", vinylItem.state) ||
                    "No state available."}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleClickDetails}
                className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
                disabled={false}
              >
                {showDetails ? "Hide Details" : "View Details"}
              </button>
              <button
                onClick={handleAddToCollection}
                className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
                disabled={loadingAddingCollection}
              >
                {loadingAddingCollection ? "Adding..." : "Add to Collection"}
              </button>
            </div>
          </div>

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
          {errorLoadingVinylDetails && (
            <p className="mt-4 text-lg text-red-500 font-bold">
              {errorLoadingVinylDetails}
            </p>
          )}

          {showDetails && vinylDetails && (
            <div className="mt-2 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6">
              <h4 className="font-bold text-2xl text-white mb-4">
                Vinyl Details:
              </h4>
              <div className="flex items-center space-x-4 text-emerald-300">
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Title: </strong>
                  {vinylItem.title || "No title available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Artist: </strong>{" "}
                  {artistName || "No artist available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Released: </strong>
                  {vinylDetails.isReleased ? "Yes" : "No"}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Color: </strong>
                  {getEnumDisplay("colors", vinylDetails.color) ||
                    "No color info available."}
                </p>
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>State: </strong>
                  {getEnumDisplay("states", vinylItem.state) ||
                    "No state available."}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-emerald-300">
                <p className="text-sm text-emerald-200 leading-relaxed">
                  <strong>Type: </strong>
                  {getEnumDisplay("vinylTypes", vinylItem.vinylType) ||
                    "No types available."}
                </p>

                <p className="text-sm text-emerald-200 leading-relaxed break-words">
                  <strong>Speed: </strong>
                  {getEnumDisplay("speeds", vinylDetails.speed) ||
                    "No Speed info available."}
                </p>
              </div>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Description: </strong>
                {vinylDetails.description || "No description available."}
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
      </div>
    </li>
  );
}

export default VinylItem;
