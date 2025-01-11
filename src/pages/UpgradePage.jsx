import React, { useEffect } from "react";
import useUpgradeProfile from "../components/hooks/update/useUpgradeProfile";
import TokenManager from "../components/hooks/TokenManager";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import useFetchProfile from "../components/hooks/fetch/useFetchProfile";

function UpgradePage() {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;
  const navigate = useNavigate();

  const { loadingUpgrade, errorUpgrade, successUpgrade, upgradeProfile } =
    useUpgradeProfile(userId);

  const {
    profileDetails,
    loadingProfileDetails,
    errorLoadingProfileDetails,
    fetchProfileDetailed,
  } = useFetchProfile();

  useEffect(() => {
    if (userId) {
      fetchProfileDetailed(userId);
    }
  }, [userId, fetchProfileDetailed]);

  const handleUpgrade = () => {
    upgradeProfile();
  };

  useEffect(() => {
    if (successUpgrade) {
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [successUpgrade, navigate]);

  if (loadingProfileDetails)
    return <div className="text-center text-emerald-400">Loading...</div>;
  if (errorLoadingProfileDetails)
    return (
      <div className="text-center text-red-400">
        Error loading profile: {errorLoadingProfileDetails}
      </div>
    );

  // Handle the case where profileDetails is null
  if (!profileDetails)
    return (
      <div className="text-center text-red-400">No profile data available</div>
    );

  return (
    <div className="container">
      <div className="inner">
        {successUpgrade && (
          <Notification type="success" message={successUpgrade} />
        )}
        {errorUpgrade && <Notification type="error" message={errorUpgrade} />}
        <div className="p-8 bg-gradient-to-br from-emerald-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-semibold text-emerald-400 mb-6">
            Upgrade to Premium
          </h1>
          <p className="text-emerald-300 mb-4">
            Premium users get access to all features. Upgrade today for only 50.
          </p>
          <div className="flex items-center mb-4">
            <Wallet size={20} className="text-emerald-300 mr-2" />
            <span className="text-emerald-300">
              Your current balance: {profileDetails?.profile?.balance}
            </span>
          </div>
          <button
            onClick={handleUpgrade}
            disabled={loadingUpgrade}
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {loadingUpgrade ? "Upgrading..." : "Upgrade Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpgradePage;
