import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/general/NavBar";
import VinylsPage from "./pages/VinylsPage";
import HomePage from "./pages/HomePage";
import AuctionsPage from "./pages/AuctionsPage";
import RecordCollectionPage from "./pages/RecordCollectionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <main className="container mx-auto mt-20 p-4 ">
        <NavBar />
        <h1 className="text-4xl font-bold mb-8">Vinylo</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Vinyls" element={<VinylsPage />} />
          <Route path="/Auctions" element={<AuctionsPage />} />
          <Route path="/RecordCollection" element={<RecordCollectionPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
