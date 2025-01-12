import React from "react";
import { Wallet } from "lucide-react";
import Notification from "../../Notification";

function UpgradeItem({
  profileDetails,
  onUpgrade,
  loading,
  error,
  notification,
  closeNotification,
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex items-center justify-center rounded-3xl shadow-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-extrabold mb-6 text-emerald-400 text-center">
            Upgrade to Premium
          </h1>
          <h2 className="text-1xl font-semibold text-emerald-300 mb-4 text-center">
            Upgrade your account to premium for <b>50 credits</b>.
          </h2>
          <p className="flex justify-center items-center mb-4">
            <Wallet size={20} className="text-center text-emerald-300 mr-2" />
            <span className=" text-center text-emerald-300">
              Your current balance:{" "}
              <b>{profileDetails?.profile?.balance} credits</b>
            </span>
          </p>
          <p className="text-emerald-300 mb-4 text-center">
            With the Premium you will be able to set an automatic bidder during
            auctions to ensure you never miss out on an item you want.
          </p>

          <button
            onClick={onUpgrade}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? "Upgrading..." : "Upgrade Now"}
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UpgradeItem;
