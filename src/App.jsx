import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import VinylsPage from "./pages/VinylsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <main className="container mx-auto mt-20 p-4 ">
        <NavBar />
        <h1 className="text-4xl font-bold mb-8">Vinylo</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Vinyls" element={<VinylsPage />} />
        </Routes>
        {/* </main> */}
      </main>
    </Router>
  );
}

export default App;
