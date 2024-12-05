import { useState } from "react";
import TokenManager from "../hooks/TokenManager";

export default function useFetchSpotifyEmbedUrl() {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmbedUrl = async (spotifyAlbumId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/spotify-embed?albumId=${spotifyAlbumId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Spotify embed URL");
      }
      const data = await response.text(); // Assuming the endpoint returns plain text URL
      setEmbedUrl(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { embedUrl, loading, error, fetchEmbedUrl };
}
