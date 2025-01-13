import React from "react";
import useDeleteVinylFromCollection from "../hooks/delete/useDeleteVinylFromCollection";

function VinylItemActions({
  collectionVinylItem,
  onDetailsClick,
  showDetails,
}) {
  const { deleteVinylFromCollection, loadingDeletingCollection } =
    useDeleteVinylFromCollection();

  const handleDeleteFromCollection = () => {
    console.log("Deleting vinyl with ID:", collectionVinylItem?.id);
    deleteVinylFromCollection(collectionVinylItem?.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <button
        onClick={onDetailsClick}
        className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
        disabled={false}
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
      <button
        onClick={handleDeleteFromCollection}
        className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
        disabled={loadingDeletingCollection}
      >
        {loadingDeletingCollection ? "Deleting..." : "Delete from Collection"}
      </button>
    </div>
  );
}

export default VinylItemActions;
