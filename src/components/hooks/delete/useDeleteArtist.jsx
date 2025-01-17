import { useState } from "react";
import axios from "axios";
import TokenManager from "../TokenManager";
import { applicationConfig } from "../../../../application.config";

const useDeleteArtist = () => {
  const [loadingDeleting, setLoadingDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const backendUrl = applicationConfig["backend-server-url"];

  const deleteArtist = async (artistId) => {
    setLoadingDeleting(true);
    setErrorDeleting(null);

    try {
      await axios.delete(`${backendUrl}/artist/${artistId}`, {
        headers: {
          Authorization: `Bearer ${TokenManager.getAccessToken()}`,
        },
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorDeleting("Error: A Artist does not exist");
        } else {
          setErrorDeleting("An error occurred: " + error.response.data);
        }
      } else {
        setErrorDeleting("An unexpected error occurred.");
      }
    } finally {
      setLoadingDeleting(false);
    }
  };

  return {
    deleteArtist,
    loadingDeleting,
    errorDeleting,
  };
};

export default useDeleteArtist;
