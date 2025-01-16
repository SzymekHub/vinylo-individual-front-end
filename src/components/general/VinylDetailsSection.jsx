import React from "react";

function VinylDetailsSection({
  showVinylDetails,
  vinylDetails,
  vinylName,
  artistName,
  getEnumDisplay,
  embedUrl,
  loading,
  error,
}) {
  return (
    <>
      {showVinylDetails && vinylDetails && (
        <div
          className={`mt-4 bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6 ${
            showVinylDetails
              ? "w-full sm:w-1/2 sm:border-l sm:border-emerald-600/30"
              : "w-full"
          } transition-all duration-300 ease-in-out`}
        >
          <h4 className="font-bold text-2xl text-white mb-4">Vinyl Details:</h4>
          <div className="flex items-center space-x-4 text-emerald-300">
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>Vinyl : </strong>
              {vinylName || " No vinyl information available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Artist: </strong>
              {artistName || "No artist information available."}
            </p>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Released: </strong>
            {vinylDetails.isReleased ? "Yes" : "No"}
          </p>
          <div className="flex items-center space-x-4 text-emerald-300">
            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>color : </strong>{" "}
              {getEnumDisplay("colors", vinylDetails.color) ||
                " No color info available."}
            </p>
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>State: </strong>
              {getEnumDisplay("states", vinylDetails.state) || "N/A"}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-emerald-300">
            <p className="text-sm text-emerald-200 leading-relaxed">
              <strong>Type: </strong>
              {getEnumDisplay("vinylTypes", vinylDetails.vinylType) || "N/A"}
            </p>

            <p className="text-sm text-emerald-200 leading-relaxed break-words">
              <strong>Speed : </strong>{" "}
              {getEnumDisplay("speeds", vinylDetails.speed) ||
                " No Speed info available."}
            </p>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed">
            <strong>Description: </strong>
            {vinylDetails.description || "No description available."}
          </p>
          <div className="mt-4">
            {loading ? (
              <p>Loading Spotify embed...</p>
            ) : error ? (
              <p className="text-red-400">Failed to load Spotify embed</p>
            ) : (
              embedUrl && (
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/album/${vinylDetails.spotifyAlbumId}?utm_source=generator`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VinylDetailsSection;
