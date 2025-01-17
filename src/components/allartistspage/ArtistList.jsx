import React from "react";
import ArtistItem from "./ArtistItem";

function ArtistList({
  artistsItems,
  loading,
  error,
  currentPage,
  totalPages,
  handlePageChange,
  onViewDetails,
  onArtistDelete,
}) {
  if (loading) {
    return <div>Loading Artists...</div>;
  }

  if (error) {
    return <div>Error loading Artists: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-7xl ">
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
            All Artists
          </h2>
          <ul className="space-y-4">
            {artistsItems && artistsItems.length > 0 ? (
              artistsItems.map((artistItem) => (
                <ArtistItem
                  key={artistItem.id}
                  artistItem={artistItem}
                  onViewDetails={onViewDetails}
                  onArtistDelete={onArtistDelete}
                />
              ))
            ) : (
              <li className="text-white">No Artists available</li>
            )}
          </ul>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0}
              className="px-3 py-1 font-semibold mx-1 rounded bg-emerald-500 text-gray-900"
            >
              Prev
            </button>
            {/* Pagination Buttons */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index ? "bg-emerald-500" : "bg-emerald-900"
                } text-gray-900`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 font-semibold mx-1 rounded bg-emerald-500 text-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistList;
