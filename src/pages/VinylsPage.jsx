import React, { useState, useEffect } from "react";
import VinylsList from "../components/VinylsList";
import InputVinyl from "../components/InputVinyl";
import axios from "axios";

function VinylsPage() {
  const [vinylsItems, setVinylsItems] = useState({ vinyls: [] });

  useEffect(() => {
    //Fetch all the vinyls from the backend, when the component mounts
    const fetchVinyls = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vinyls");
        setVinylsItems(response.data);
        console.log("Fetched vinyls:", response.data); // Logs the response
      } catch (error) {
        console.error("There was an error fetching the vinyls :( ", error);
      }
    };
    fetchVinyls();
  }, []);

  const addItem = async (
    title,
    description,
    aristName,
    vinylType,
    isReleased
  ) => {
    // Find the maximum id in the existing vinyls
    const existingIds = vinylsItems.vinyls.map((vinyl) => vinyl.id);
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;

    const newItem = {
      id: maxId + 1,
      title: title,
      description: description,
      aristName: aristName,
      vinylType: vinylType,
      isReleased: isReleased,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/vinyls",
        newItem
      );
      const saveId = response.data;
      newItem.id = saveId.id;

      //Update the state with the new item
      const tempVinylsItems = {
        vinyls: [...vinylsItems.vinyls, newItem],
      };
      setVinylsItems(tempVinylsItems);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data === '400 BAD_REQUEST "Vinyl already exists"'
      ) {
        alert("Error: Duplicate vinyl item");
        // Handle the specific error case here
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <div className="container">
      <div className="inner">
        <InputVinyl addItem={addItem} />
        <VinylsList vinylsItems={vinylsItems} />
      </div>
    </div>
  );
}

export default VinylsPage;
