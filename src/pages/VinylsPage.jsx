import React, { useState } from "react";
import InputItem from "../components/InputItem";
import VinylList from "../components/TodoList";

function VinylsPage() {
  // This data is only present for demo purposes. Usually you obtain this through the backend.
  const vinylsItemsData = [
    {
      id: 1,
      title: "ALL RED",
      Released: true,
    },
  ];

  const [vinylsItems, setVinylsItems] = useState(vinylsItemsData);

  const addItem = (title) => {
    const newItem = {
      id: 2,
      title: title,
      done: false,
    };
    setToDoItems([...vinylsItems, newItem]);
  };

  return (
    <div className="container">
      <div className="inner">
        <InputItem addItem={addItem} />
        <VinylList vinylsItems={vinylsItems} />
      </div>
    </div>
  );
}

export default VinylsPage;
