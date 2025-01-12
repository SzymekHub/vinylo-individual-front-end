import React from "react";
import { Mail, VenetianMask, ScrollText, Wallet } from "lucide-react";

function ProfileInfo({ profileDetails }) {
  const { profile, user } = profileDetails;
  return (
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
  );
}

export default ProfileInfo;
