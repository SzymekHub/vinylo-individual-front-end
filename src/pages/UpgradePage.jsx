import React, { useState, useEffect } from "react";
import Notification from "../components/Notification";
import useFetchProfile from "../components/hooks/fetch/useFetchProfile";
import useUpgradeProfile from "../components/hooks/update/useUpgradeProfile";
import UpgradeItem from "../components/hooks/upgrade/UpgradeItem";
import TokenManager from "../components/hooks/TokenManager";

function UpgradePage() {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;
  const [notification, setNotification] = useState(null);

  const {
    profileDetails,
    loadingProfileDetails,
    errorLoadingProfileDetails,
    fetchProfileDetailed,
  } = useFetchProfile();

  const {
    loadingUpgrade,
    errorUpgrade,
    successUpgrade,
    upgradeProfile,
    profileUpdated,
  } = useUpgradeProfile(userId);

  useEffect(() => {
    if (userId) {
      fetchProfileDetailed(userId);
    }
  }, [userId, fetchProfileDetailed]);

  useEffect(() => {
    if (successUpgrade) {
      setNotification({
        type: "success",
        message: successUpgrade,
      });
    } else if (profileUpdated) {
      setNotification({
        type: "info",
        message: "Profile updated to Premium successfully!",
      });
    }
    if (errorUpgrade) {
      setNotification({
        type: "error",
        message: errorUpgrade,
      });
    }
  }, [errorUpgrade, successUpgrade, profileUpdated]);

  const handleUpgrade = async () => {
    upgradeProfile();
  };
  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <UpgradeItem
      profileDetails={profileDetails}
      onUpgrade={handleUpgrade}
      loading={loadingUpgrade}
      error={errorUpgrade}
      notification={notification}
      closeNotification={closeNotification}
    />
  );
}

export default UpgradePage;
