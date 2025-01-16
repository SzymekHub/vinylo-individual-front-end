import React, { useState, useEffect, useRef } from "react";
import useFetchAuctionDetailed from "../hooks/fetch/useFetchAuctionDetailed";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";
import useFetchVinylDetailed from "../hooks/fetch/useFetchVinylDetailed";
import useFetchSpotifyEmbedUrl from "../spotify/useFetchSpotifyEmbedUrl";
import useFetchArtists from "../hooks/fetch/useFetchArtists";
import useVinylEnums from "../hooks/fetch/useFetchEnums";
import useUpdateAuction from "../hooks/update/useUpdateAuction";
import UpdateAuctionForm from "../hooks/update/UpdateAuctionForm";
import TokenManager from "../hooks/TokenManager";
import useFetchAuctions from "../hooks/fetch/useFetchAuction";
import usePlaceBid from "../hooks/update/usePlaceBid";
import AuctionItemHeader from "./AuctionItemHeader";
import AuctionDetailsSection from "./AuctionDetailsSection";
import VinylDetailsSection from "../general/VinylDetailsSection";

function AuctionItem({ auctionItem }) {
  // Added a state to toggle visibility of details
  const [showDetails, setShowDetails] = useState(false);
  // State to toggle vinyl details visibility
  const [showVinylDetails, setShowVinylDetails] = useState(false);
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;
  const setAuctionDetailsRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    auctionDetails,
    loadingAuctionDetails,
    errorLoadingAuctionDetails,
    fetchAuctionDetailed,
    setAuctionDetails,
  } = useFetchAuctionDetailed();
  useEffect(() => {
    setAuctionDetailsRef.current = setAuctionDetails;
  }, [setAuctionDetails]);

  const { vinylsItems } = useFetchVinyls();
  const {
    vinylDetails,
    loadingVinylDetails,
    errorLoadingVinylDetails,
    fetchVinylDetailed,
  } = useFetchVinylDetailed();
  const { embedUrl, loading, error, fetchEmbedUrl } = useFetchSpotifyEmbedUrl();
  const [embedLoading, setEmbedLoading] = useState(false);
  const { artistsItems, loading: artistsLoading } = useFetchArtists();
  const { enums } = useVinylEnums();

  // Now does not require a second parameter as setAuctionDetails is being handled via ref
  const {
    loadingUpdate,
    errorUpdate,
    successUpdate,
    updateAuction,
    setFetchAuctionDetailed,
  } = useUpdateAuction(auctionItem.id, setAuctionDetails);
  useEffect(() => {
    setFetchAuctionDetailed(fetchAuctionDetailed);
  }, [fetchAuctionDetailed, setFetchAuctionDetailed]);

  //place bid state
  const { loadingBid, errorBid, successBid, placeBid } = usePlaceBid(
    auctionItem.id
  );

  const { handlePageChange } = useFetchAuctions();

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
    setShowVinylDetails((prevState) => !prevState); // Toggle vinyl details visibility
    // Find the associated vinyl ID from auctionDetails
    const vinylId = auctionDetails?.vinyl_id;
    const spotifyAlbumId = vinylsItems.find(
      (vinyl) => vinyl.id === auctionDetails?.vinyl_id
    )?.spotifyAlbumId;

    if (!vinylId) {
      return; // Exit if no vinyl ID is available
    }

    if (!showVinylDetails && !vinylDetails) {
      try {
        setEmbedLoading(true); // Set loading to true before fetching
        // Fetch the vinyl details using the correct ID
        await fetchVinylDetailed(vinylId);
        await fetchEmbedUrl(spotifyAlbumId);
        setEmbedLoading(false);
      } catch (error) {}
    }
  };

  const handlePlaceBid = async (bidAmount) => {
    try {
      await placeBid(bidAmount, userId);
      // Refetch Auctions after placing a bid
      handlePageChange(0);
    } catch (e) {}
  };

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
    <li className="bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/3 relative">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1453128650469-95f7ddbe78cf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaH0dG8tdGFwYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>

        {/* Right Content Section */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col gap-6">
          <AuctionItemHeader
            auctionItem={auctionDetails || auctionItem}
            showDetails={showDetails}
            showVinylDetails={showVinylDetails}
            handleViewDetails={handleViewDetails}
            handleViewVinylDetails={handleViewVinylDetails}
            loadingVinylDetails={loadingVinylDetails}
          />

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
              {!isEditMode ? (
                <AuctionDetailsSection
                  showDetails={showDetails}
                  auctionDetails={auctionDetails}
                  userId={userId}
                  loadingBid={loadingBid}
                  auctionItem={auctionDetails || auctionItem}
                  toggleEditMode={() => setIsEditMode((prev) => !prev)}
                />
              ) : (
                <UpdateAuctionForm
                  auction={auctionDetails}
                  updateAuction={updateAuction}
                  toggleEditMode={() => setIsEditMode((prev) => !prev)}
                />
              )}
            </div>

            <VinylDetailsSection
              showVinylDetails={showVinylDetails}
              vinylDetails={vinylDetails}
              vinylName={
                vinylsItems.find(
                  (vinyl) => vinyl.id === auctionDetails?.vinyl_id
                )?.title
              }
              artistName={artistName}
              getEnumDisplay={getEnumDisplay}
              embedUrl={embedUrl}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
      {/* Error and Success Messages */}
      {errorUpdate && (
        <p className="mt-4 text-sm text-red-500">{errorUpdate}</p>
      )}
      {successUpdate && (
        <p className="mt-4 text-sm text-emerald-500">{successUpdate}</p>
      )}
      {errorBid && <p className="mt-4 text-sm text-red-500">{errorBid}</p>}
      {successBid && (
        <p className="mt-4 text-sm text-emerald-500">{successBid}</p>
      )}
    </li>
  );
}

export default AuctionItem;
