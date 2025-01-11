import React, { useState, useEffect } from "react";

function Notification({ type, message, duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);

      // Cleanup the timer if the component unmounts or the duration changes
      return () => clearTimeout(timer);
    }
    // Include duration in the dependency array to re-run the effect when it changes
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  let bgColorClass = "bg-emerald-600";
  if (type === "error") {
    bgColorClass = "bg-red-600";
  }

  return (
    <div
      className={`notification ${bgColorClass} text-white p-4 rounded-md shadow-md transition-all duration-300 `}
    >
      <div className="flex justify-between items-center">
        <p className="flex-1 text-sm">{message}</p>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-300 focus:outline-none text-sm"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Notification;
