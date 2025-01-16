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
      <div className="w-full max-w-10xl h-[600px] bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 flex rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>
        {/* Right Content Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-emerald-400 drop-shadow-lg">
                Upgrade to Premium
              </h1>
              <h2 className="mt-2 text-1xl font-semibold text-emerald-300">
                Upgrade your account to premium for <b>50 credits</b>.
              </h2>
            </div>
            <div className="flex items-center justify-center mb-4">
              <Wallet size={20} className="text-center text-emerald-300 mr-2" />
              <span className="text-center text-emerald-300">
                Your current balance:{" "}
                <b>{profileDetails?.profile?.balance} credits</b>
              </span>
            </div>
            <p className="text-emerald-300 mb-4 text-center">
              With the Premium you will be able to set an automatic bidder
              during auctions to ensure you never miss out on an item you want.
            </p>
            <button
              onClick={onUpgrade}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-emerald-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 disabled:opacity-50"
            >
              {loading ? "Upgrading..." : "Upgrade Now"}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeItem;
