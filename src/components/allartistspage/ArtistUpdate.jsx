import React from "react";

function ArtistActions({ isEditMode, toggleEditMode }) {
  return !isEditMode ? (
    <div className="flex flex-col gap-2">
      <button
        onClick={toggleEditMode}
        className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Update Artist
      </button>
    </div>
  ) : null;
}

export default ArtistActions;
