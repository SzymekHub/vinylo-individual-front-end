import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/general/NavBar";
import VinylsPage from "./pages/VinylsPage";
import HomePage from "./pages/HomePage";
import SellAuctionPage from "./pages/SellAuctionPage";
import AllAuctionsPage from "./pages/AllAuctionsPage";
import AllVinylsPage from "./pages/AllVinylsPage";
import VinylCollectionPage from "./pages/VinylCollectionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/general/PrivateRoute";
import TokenManager from "./components/hooks/TokenManager";
import ChatPage from "./pages/ChatPage";

function App() {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [localClaims, setLocalClaims] = useState(null); // Assuming you need this for local storage.
  const [userDetails, setUserDetails] = useState(null);
  return (
    <Router>
      <main className="container mx-auto mt-20 p-4 ">
        <NavBar
          claims={claims}
          setClaims={setClaims}
          setLocalClaims={setLocalClaims}
          setUserDetails={setUserDetails}
        />
        <h1 className="text-4xl font-bold mb-8">Vinylo</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/Vinyls"
            element={
              <PrivateRoute element={<VinylsPage />} allowedRoles={["ADMIN"]} />
            }
          />
          <Route
            path="/SellAuctions"
            element={
              <PrivateRoute
                element={<SellAuctionPage />}
                allowedRoles={["REGULAR", "ADMIN", "PREMIUM"]}
              />
            }
          />
          <Route
            path="/Auctions"
            element={
              <PrivateRoute
                element={<AllAuctionsPage />}
                allowedRoles={["REGULAR", "ADMIN", "PREMIUM"]}
              />
            }
          />
          <Route
            path="/Chat"
            element={
              <PrivateRoute
                element={<ChatPage />}
                allowedRoles={["REGULAR", "ADMIN", "PREMIUM"]}
              />
            }
          />
          <Route
            path="/Collection"
            element={
              <PrivateRoute
                element={<VinylCollectionPage />}
                allowedRoles={["REGULAR", "ADMIN", "PREMIUM"]}
              />
            }
          />
          <Route
            path="/AllVinyls"
            element={
              <PrivateRoute
                element={<AllVinylsPage />}
                allowedRoles={["REGULAR", "ADMIN", "PREMIUM"]}
              />
            }
          />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage setClaims={setClaims} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
