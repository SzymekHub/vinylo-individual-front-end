import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlaceBidForm from "../components/auctionPage/PlaceBidForm";
import Notification from "../components/Notification";
import useFetchProfile from "../components/hooks/fetch/useFetchProfile";
import usePlaceBid from "../components/hooks/update/usePlaceBid";
import useFetchAuctionDetailed from "../components/hooks/fetch/useFetchAuctionDetailed";
import TokenManager from "../components/hooks/TokenManager";

function BidPage() {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;

  const [notification, setNotification] = useState(null);
  const [bidSuccessful, setBidSuccessful] = useState(false);

  const { profileDetails, fetchProfileDetailed } = useFetchProfile();
  const {
    auctionDetails,
    fetchAuctionDetailed,
    loading: loadingAuction,
  } = useFetchAuctionDetailed(auctionId);
  const { loadingBid, errorBid, successBid, placeBid } = usePlaceBid(auctionId);
  useEffect(() => {
    if (userId) {
      fetchProfileDetailed(userId);
    }
    if (auctionId) {
      fetchAuctionDetailed(auctionId);
    }
  }, [userId, auctionId, fetchProfileDetailed, fetchAuctionDetailed]);

  useEffect(() => {
    if (successBid) {
      setNotification({
        type: "success",
        message: successBid,
      });
      setBidSuccessful(true);
    } else if (errorBid) {
      setNotification({
        type: "error",
        message: errorBid,
      });
      setBidSuccessful(false);
    }
  }, [errorBid, successBid]);

  const handlePlaceBid = async (bidAmount) => {
    try {
      await placeBid(bidAmount, userId);
    } catch (error) {
      // Error will be set by the hook.
    }
  };

  const closeNotification = () => {
    setNotification(null);
    if (bidSuccessful) {
      navigate("/auctions");
    }
    if (bidSuccessful === false) {
      navigate("/auctions");
    }
  };

  const handleCloseBidPage = () => {
    navigate(-1);
  };

  return (
    <PlaceBidForm
      auctionDetails={auctionDetails}
      profileDetails={profileDetails}
      onPlaceBid={handlePlaceBid}
      loadingAuction={loadingAuction}
      loadingBid={loadingBid}
      error={errorBid}
      onClose={handleCloseBidPage}
      notification={notification}
      closeNotification={closeNotification}
    />
  );
}

export default BidPage;
