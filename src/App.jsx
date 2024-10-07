import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
