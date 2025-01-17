import React, { useState, useEffect } from "react";
import useFetchArtistsPagination from "../hooks/fetch/useFetchArtistsPagination";
import TokenManager from "../hooks/TokenManager";
import useDeleteArtist from "../hooks/delete/useDeleteArtist";
import useUpdateArtistPage from "../hooks/update/useUpdateArtistPage";
import UpdateArtistForm from "../hooks/update/updateArtistForm";
import ArtistActions from "./ArtistUpdate";

function ArtistItem({ artistItem, onArtistDelete }) {
  const { id, name, bio } = artistItem;
  const { artistsItems, loading, error } = useFetchArtistsPagination();
  const roles = TokenManager.getRoles();
  const isAdmin = roles.includes("ADMIN");
  const [isEditMode, setIsEditMode] = useState(false);
  const [artistDetails, setArtistDetails] = useState(artistItem);

  const { loadingUpdate, errorUpdate, successUpdate, updateArtist } =
    useUpdateArtistPage(id, setArtistDetails);

  const { deleteArtist, loadingDeleting } = useDeleteArtist();

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdateArtist = async (name, bio) => {
    await updateArtist(bio);
    setArtistDetails((prev) => ({ ...prev, name: name, bio: bio }));
  };

  const handleDeleteArtist = async () => {
    console.log("Deleting artist with ID:", id);
    await deleteArtist(id);
    onArtistDelete();
  };

  if (!artistItem) {
    return <div>Loading details...</div>;
  }

  return (
    <li className="bg-gradient-to-br from-gray-900 via-emerald-950 to-emerald-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/3 relative">
          <img
            alt="Background"
            src="https://cdn.pixabay.com/photo/2015/02/04/05/01/musician-623362_1280.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent"></div>
        </div>
        {/* Right Content Section */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {!isEditMode ? (
              <div className="w-4/5">
                <h3 className="font-bold text-2xl text-white mb-4">
                  {artistDetails?.name || "No Name available."}
                </h3>
                <div className="flex items-center space-x-4 text-emerald-300">
                  <p className="text-sm text-emerald-200 leading-relaxed break-words">
                    <strong>bio: </strong>
                    {artistDetails?.bio || "No bio available."}
                  </p>
                </div>
              </div>
            ) : (
              <UpdateArtistForm
                artist={artistDetails}
                updateArtist={handleUpdateArtist}
                toggleEditMode={toggleEditMode}
              />
            )}

            <div className="flex gap-2">
              <ArtistActions
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
              />
              {isAdmin && (
                <button
                  onClick={handleDeleteArtist}
                  className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full hover:text-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
                  disabled={loadingDeleting}
                >
                  {loadingDeleting ? "Deleting..." : "Delete from Collection"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ArtistItem;
