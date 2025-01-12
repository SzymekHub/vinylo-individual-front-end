import React from "react";
import ProfileInfo from "./ProfileInfoItem";
import ProfileActions from "./ProfileUpdate";
import UpdateProfileForm from "./UpdateProfileForm";
import userImage from "/assets/img/user.png";

function ProfileItem({
  profileDetails,
  updateProfile,
  isEditMode,
  toggleEditMode,
}) {
  if (!profileDetails) {
    return <div className="text-center text-emerald-400">Loading...</div>;
  }

  const { profile, user } = profileDetails;

  return (
    <div className="flex items-center justify-center px-4 md:px-8">
      <div className="w-full md:w-[480px] h-[600px] bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex items-center justify-center rounded-3xl shadow-2xl">
        <div className="w-full space-y-8 px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg">
              <img
                src={userImage}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            {!isEditMode ? (
              <>
                <ProfileInfo profileDetails={profileDetails} />
                <ProfileActions
                  isEditMode={isEditMode}
                  toggleEditMode={toggleEditMode}
                  user={user}
                />
              </>
            ) : (
              <UpdateProfileForm
                profile={profile}
                updateProfile={updateProfile}
                toggleEditMode={toggleEditMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
