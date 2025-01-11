import React, { useState, useEffect } from "react";
import ProfileItem from "../components/profilePage/ProfileItem";
import useFetchProfile from "../components/hooks/fetch/useFetchProfile";
import useUpdateProfilePage from "../components/hooks/update/useUpdateProfile";
import TokenManager from "../components/hooks/TokenManager";
import Notification from "../components/Notification";

function ProfilePage() {
  const userClaims = TokenManager.getClaims();
  const userId = userClaims?.id;

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const {
    profileDetails,
    loadingProfileDetails,
    errorLoadingProfileDetails,
    fetchProfileDetailed,
    setProfileDetails,
  } = useFetchProfile();

  const { loadingUpdate, errorUpdate, successUpdate, updateProfile } =
    useUpdateProfilePage(userId, setProfileDetails);

  useEffect(() => {
    if (userId) {
      fetchProfileDetailed(userId);
    }
  }, [userId, fetchProfileDetailed]);

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
      <div className="flex items-center justify-between mb-8"></div>

      <div className="inner">
        {successUpdate && (
          <Notification type="success" message={successUpdate} />
        )}
        {errorUpdate && <Notification type="error" message={errorUpdate} />}
        <ProfileItem
          profileDetails={profileDetails}
          updateProfile={updateProfile}
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
