import React from "react";
import { Mail, Disc, VenetianMask, ScrollText, Wallet } from "lucide-react";

function ProfileItem({ profileDetails }) {
  if (!profileDetails) {
    return <div className="text-center text-emerald-400">Loading...</div>;
  }

  const { profile, user } = profileDetails;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl h-[250px] p-8 bg-gradient-to-br from-emerald-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
