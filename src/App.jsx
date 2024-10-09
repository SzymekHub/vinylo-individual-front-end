import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import VinylsPage from "./pages/VinylsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-white-500">
        <NavBar />
        {/* Added marginTop to prevent the content from going behind the navbar */}
        <main
          className="flex-1 p-8 overflow-auto"
          style={{ marginTop: "20%" }} // Adjust based on navbar height
        >
          <h1 className="text-3xl font-bold">Vinylo </h1>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Vinyls" element={<VinylsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
