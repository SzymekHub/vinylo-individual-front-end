import React from "react";
import { Mail, Disc, VenetianMask, ScrollText, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl h-[350px] p-8 bg-gradient-to-br from-emerald-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg">
              <img
                src="/assets/img/user.png"
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <>
              <h1 className="text-3xl font-bold text-emerald-400">
                {user?.username || "No Username"}
              </h1>
              <div className="flex items-center space-x-4 text-emerald-300">
                <div className="flex items-center space-x-2">
                  <VenetianMask size={16} />
                  <span>{user?.role || "No Role"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{user?.email || "No Email"}</span>
                </div>

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 text-emerald-300">
                    <Wallet size={16} />
                    <span>{profile?.balance || "No balance available."}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-emerald-300">
                <ScrollText size={16} />
                <span> {profile?.bio || "No bio available."}</span>
              </div>
            </>
            {!isEditMode ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={toggleEditMode}
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Update Profile
                </button>
                {user.role === "REGULAR" && (
                  <Link
                    to="/Upgrade"
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Upgrade Account
                  </Link>
                )}
              </div>
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

function UpdateProfileForm({ profile, updateProfile, toggleEditMode }) {
  const [bio, setBio] = React.useState(profile?.bio || "");
  const [balance, setBalance] = React.useState(profile?.balance || "");

  const handleBioChange = (e) => setBio(e.target.value);
  const handleBalanceChange = (e) => setBalance(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(bio, balance);
    toggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-emerald-300"
        >
          Bio
        </label>
        <input
          type="text"
          id="bio"
          value={bio}
          onChange={handleBioChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="balance"
          className="block text-sm font-medium text-emerald-300"
        >
          Balance
        </label>
        <input
          type="number"
          id="balance"
          value={balance}
          onChange={handleBalanceChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Update Profile
      </button>
    </form>
  );
}

export default ProfileItem;
