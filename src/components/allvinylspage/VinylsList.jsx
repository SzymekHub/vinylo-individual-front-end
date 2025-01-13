import React from "react";
import VinylItem from "./VinylItem";

function VinylList({
  vinylsItems,
  loading,
  error,
  currentPage,
  totalPages,
  handlePageChange,
  onViewDetails,
}) {
  if (loading) {
    return <div>Loading vinyls...</div>;
  }

  if (error) {
    return <div>Error loading vinyls: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-7xl ">
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 sm:text-3xl text-emerald-500">
            All Vinyls
          </h2>
          <ul className="space-y-4">
            {vinylsItems && vinylsItems.length > 0 ? (
              vinylsItems.map((vinylItem) => (
                <VinylItem
                  key={vinylItem.id}
                  vinylItem={vinylItem}
                  onViewDetails={onViewDetails} // Pass onViewDetails to VinylItem
                />
              ))
            ) : (
              <li className="text-white">No vinyls available</li>
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

export default VinylList;
