import React, { useState } from "react";
import useFetchVinyls from "../hooks/fetch/useFetchVinyls";
import TokenManager from "../hooks/TokenManager";
import useAddAuction from "../hooks/add/useAddAuction";

function InputAuction(props) {
  // Get user ID from the token
  const userClaims = TokenManager.getClaims();
  const sellerId = userClaims?.id;

  const {
    vinylsItems,
    loading: vinylsLoading,
    error: vinylsError,
  } = useFetchVinyls();

  const [vinylId, setVinylId] = useState(null); //Stores vinyl ID
  const [description, setDescription] = useState("");

  const [auctionsItems, setAuctionsItems] = useState({ auctions: [] });
  const { addAuction, loading, error, addedAuctionMessage } = useAddAuction(
    auctionsItems,
    setAuctionsItems
  );

  if (vinylsLoading) return <p>Loading Vinyls....</p>;
  if (vinylsError) return <p>Error loading vinyls: {vinylsError}</p>;

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const startingPrice = e.target.startingPrice.value;
    const currentPrice = e.target.currentPrice.value;
    const startTime = e.target.startTime.value; // Contains both date and time
    const endTime = e.target.endTime.value; // Contains both date and time

    /// If the backend expects only the date, you can extract the date from the datetime-local value
    const startDate = startTime.split("T")[0]; // Extract the date part
    const endDate = endTime.split("T")[0]; // Extract the date part

    addAuction(
      title,
      vinylId,
      sellerId,
      description,
      parseFloat(startingPrice),
      parseFloat(currentPrice),
      startDate, // Send only date, as the backend uses LocalDate (date without time)
      endDate // Send only date
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold sm:text-3xl text-emerald-500">
        Add New Auction
      </h2>

      <form
        className="w-full mx-auto mb-0 mt-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Title :</p>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter Auction title"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Vinyl :</p>
          <div className="relative">
            <select
              id="vinyl"
              name="vinyl"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              onChange={(e) => setVinylId(e.target.value)} // Store vinyl ID on select
              required
            >
              <option value="">Select Vinyl</option>
              {vinylsItems && vinylsItems.length > 0 ? (
                vinylsItems.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))
              ) : (
                <option disabled>No vinyls available</option>
              )}
            </select>
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Description :
          </p>
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <div className="relative">
            <textarea
              type="text"
              name="description"
              className="w-full px-3 py-2 rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              placeholder="Enter vinyl description"
              rows="3"
              maxLength={155}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="text-emerald-400 text-sm text-right">
              {description.length}/155
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Starting Price :
          </p>
          <label htmlFor="startingPrice" className="sr-only">
            Starting Price
          </label>
          <div className="relative">
            <input
              type="number"
              name="startingPrice"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">
            Current Price :
          </p>
          <label htmlFor="currentPrice" className="sr-only">
            Current Price
          </label>
          <div className="relative">
            <input
              type="number"
              name="currentPrice"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">Start Time :</p>
          <label htmlFor="startTime" className="sr-only">
            Start Time
          </label>
          <div className="relative">
            <input
              type="date"
              name="startTime"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              required
            />
          </div>
        </div>

        <div>
          <p className="font-bold sm:text-1xl text-emerald-500">End Time :</p>
          <label htmlFor="endTime" className="sr-only">
            End Time
          </label>
          <div className="relative">
            <input
              type="date"
              name="endTime"
              className="w-full rounded-lg bg-emerald-800 border-emerald-700 p-4 pe-12 text-sm shadow-sm text-emerald-50 placeholder-emerald-300"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <button
            type="submit"
            className="inline-block rounded-lg items-center bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            {loading ? "Adding..." : "Add Auction!"}
          </button>
        </div>
      </form>

      {/* Error and Success Messages */}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {addedAuctionMessage && (
        <p className="mt-4 text-sm text-emerald-500">{addedAuctionMessage}</p>
      )}
    </div>
  );
}

export default InputAuction;
