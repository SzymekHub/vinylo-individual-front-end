import React, { useState, useEffect } from "react";
import useFetchAuctionDetailed from "../hooks/fetch/useFetchAuctionDetailed";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";
import useFetchVinylDetailed from "../hooks/fetch/useFetchVinylDetailed";
import useFetchSpotifyEmbedUrl from "../spotify/useFetchSpotifyEmbedUrl";
import useFetchUsers from "../hooks/fetch/useFetchUsers";
import useFetchArtists from "../hooks/fetch/useFetchArtists";
import useVinylEnums from "../hooks/fetch/useFetchEnums";

function AuctionItem({ auctionItem }) {
  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);
  // State to toggle vinyl details visibility
  const [showVinylDetails, setShowVinylDetails] = useState(false);
  const [sellerUsername, setSellerUsername] = useState(null);

  // Fetch auction details using custom hook
  const {
    auctionDetails,
    loadingAuctionDetails,
    errorLoadingAuctionDetails,
    fetchAuctionDetailed,
  } = useFetchAuctionDetailed();

  const { vinylsItems } = useFetchVinyls();
  const {
    vinylDetails,
    loadingVinylDetails,
    errorLoadingVinylDetails,
    fetchVinylDetailed,
  } = useFetchVinylDetailed();
  const { embedUrl, loading, error, fetchEmbedUrl } = useFetchSpotifyEmbedUrl();
  const { artistsItems, loading: artistsLoading } = useFetchArtists();
  const { enums } = useVinylEnums();

  const handleViewDetails = async () => {
    if (!showDetails && !auctionDetails) {
      await fetchAuctionDetailed(auctionItem.id); // Fetch detailed auction info
    }
    setShowDetails((prevState) => {
      const newState = !prevState;

      // If hiding details, also hide vinyl details
      if (!newState) {
        setShowVinylDetails(false);
      }

      return newState; // Toggle details view
    });
  };

  const handleViewVinylDetails = async () => {
    // Find the associated vinyl ID from auctionDetails
    const vinylId = auctionDetails?.vinyl_id;
    const spotifyAlbumId = vinylsItems.find(
      (vinyl) => vinyl.id === auctionDetails?.vinyl_id
    )?.spotifyAlbumId;

    if (!vinylId) {
      console.error("Vinyl ID not found for this auction.");
      return; // Exit if no vinyl ID is available
    }

    if (!showVinylDetails && !vinylDetails) {
      try {
        // Fetch the vinyl details using the correct ID
        await fetchVinylDetailed(vinylId);
        await fetchEmbedUrl(spotifyAlbumId);
      } catch (error) {
        console.error("Failed to fetch vinyl details:", error);
      }
    }
    setShowVinylDetails((prevState) => !prevState); // Toggle vinyl details visibility
  };

  // Fetch seller's username whenever auctionDetails are loaded
  useEffect(() => {
    const fetchSellerUsername = async () => {
      if (auctionDetails?.seller_id) {
        try {
          const seller = await useFetchUsers.getUser(auctionDetails.seller_id);
          setSellerUsername(seller.username);
        } catch (error) {
          console.error("Failed to fetch seller details:", error);
        }
      }
    };

    fetchSellerUsername();
  }, [auctionDetails]);

  const formatDateWithoutSeconds = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  //find the vinyl and user name by matching vinyl_id and user_id with fetched vinyls and users.
  const vinylName = vinylsItems.find(
    (vinyl) => vinyl.id === auctionDetails?.vinyl_id
  )?.title;

  // Find the artist name by matching artist_id with fetched artists
  const artistName = artistsItems.find(
    (artist) => artist.id === vinylDetails?.artist_id
  )?.name;

  const getEnumDisplay = (key, value) =>
    enums?.[key]?.find((enumValue) => enumValue === value) || value;

  if (!auctionItem) {
    return <div>Loading details...</div>;
  }

  return (
    <li className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-lg p-6 flex flex-col gap-6 shadow-lg">
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
          showVinylDetails ? "mb-4" : ""
        }`}
      >
        <div className="w-4/5">
          <h3 className="font-bold text-2xl text-white mb-4">
            {auctionItem.title}
          </h3>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Current Price : </strong> $
            {auctionItem.currentPrice.toFixed(2)}
          </p>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Ending : </strong>{" "}
            {formatDateWithoutSeconds(auctionItem.endTime) +
              " (MM/DD/YYYY/HH:MM)" || "No end time available."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleViewDetails}
            className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
            disabled={loadingAuctionDetails}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
          {showDetails && (
            <button
              className="flex items-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
              onClick={handleViewVinylDetails}
              disabled={loadingVinylDetails}
            >
              {loadingVinylDetails
                ? "Loading..."
                : showVinylDetails
                ? "Hide Vinyl Details"
                : "View Vinyl Details"}
            </button>
          )}
        </div>
      </div>

      {errorLoadingAuctionDetails && (
        <p className="mt-4 text-lg text-red-500 font-bold">
          {errorLoadingAuctionDetails}
        </p>
      )}

      <div
        className={`flex flex-col gap-6 ${
          showVinylDetails ? "sm:flex-row" : ""
        } transition-all duration-300 ease-in-out`}
      >
        <div
          className={`${
            showVinylDetails ? "w-full sm:w-1/2 sm:pr-6" : "w-full"
          } transition-all duration-300 ease-in-out`}
        >
          {showDetails && auctionDetails && (
            <div className="mt-2">
              <h4 className="font-bold text-2xl text-white mb-4">
                {" "}
                Auction Details:{" "}
              </h4>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Seller : </strong>{" "}
                {sellerUsername || "No seller information available."}
              </p>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Vinyl : </strong>
                {vinylName || " No vinyl information available."}
              </p>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Starting Price :</strong> $
                {auctionDetails.startingPrice.toFixed(2) ||
                  "No starting price available."}
              </p>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Start Time :</strong>{" "}
                {formatDateWithoutSeconds(auctionDetails.startTime) +
                  " (MM/DD/YYYY/HH:MM)" || "No start time available."}
              </p>
              <p className="text-sm text-emerald-200 leading-relaxed break-words">
                <strong>Description :</strong>{" "}
                {auctionDetails.description || " No description available."}
              </p>
            </div>
          )}
        </div>

        {showVinylDetails && vinylDetails && (
          <div
            className={`mt-4 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6 ${
              showVinylDetails
                ? "w-full sm:w-1/2 sm:border-l sm:border-emerald-600/30"
                : "w-full"
            } transition-all duration-300 ease-in-out`}
          >
            <h4 className="font-bold text-2xl text-white mb-4">
              Vinyl Details:
            </h4>
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>Vinyl : </strong>
              {vinylName || " No vinyl information available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Type: </strong>
              {getEnumDisplay("vinylTypes", vinylDetails.vinylType) || "N/A"}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>State: </strong>
              {getEnumDisplay("states", vinylDetails.state) || "N/A"}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Artist: </strong>
              {artistName || "No artist information available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>Speed : </strong>{" "}
              {getEnumDisplay("speeds", vinylDetails.speed) ||
                " No Speed info available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>color : </strong>{" "}
              {getEnumDisplay("colors", vinylDetails.color) ||
                " No color info available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Released: </strong>
              {vinylDetails.isReleased ? "Yes" : "No"}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
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
                    src={`https://open.spotify.com/embed/album/${vinylDetails.spotifyAlbumId}?utm_source=generator`}
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
      </div>
    </li>
  );
}

export default AuctionItem;
