import React, { useState } from "react";

function UpdateAuctionForm({ auction, updateAuction, toggleEditMode }) {
  const [title, setTitle] = useState(auction?.title || "");
  const [description, setDescription] = useState(auction?.description || "");
  const [startingPrice, setStartingPrice] = useState(
    auction?.startingPrice || ""
  );
  const [currentPrice, setCurrentPrice] = useState(auction?.currentPrice || "");
  const [startTime, setStartTime] = useState(auction?.startTime || "");
  const [endTime, setEndTime] = useState(auction?.endTime || "");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleStartingPriceChange = (e) => setStartingPrice(e.target.value);
  const handleCurrentPriceChange = (e) => setCurrentPrice(e.target.value);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = startTime.split("T")[0];
    const endDate = endTime.split("T")[0];

    updateAuction(
      title,
      description,
      parseFloat(startingPrice),
      parseFloat(currentPrice),
      startDate,
      endDate
    );
    toggleEditMode();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-emerald-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-emerald-300"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="startingPrice"
          className="block text-sm font-medium text-emerald-300"
        >
          Starting Price
        </label>
        <input
          type="number"
          id="startingPrice"
          value={startingPrice}
          onChange={handleStartingPriceChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="startTime"
          className="block text-sm font-medium text-emerald-300"
        >
          Start Time
        </label>
        <input
          type="date"
          id="startTime"
          value={startTime}
          onChange={handleStartTimeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="endTime"
          className="block text-sm font-medium text-emerald-300"
        >
          End Time
        </label>
        <input
          type="date"
          id="endTime"
          value={endTime}
          onChange={handleEndTimeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-400 focus:ring-emerald-400 bg-gray-800 text-white"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Update Auction
      </button>
    </form>
  );
}

export default UpdateAuctionForm;
