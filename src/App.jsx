import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Players from "./pages/Players";
import Compare from "./pages/Compare";
import StatsDetail from "./pages/StatsDetail";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* TEAMS */}
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamCode" element={<TeamDetail />} />

        {/* PLAYERS */}
        <Route path="/players" element={<Players />} />

        {/* STATS (🔥 THIS WAS MISSING 🔥) */}
        <Route path="/stats/:statType" element={<StatsDetail />} />

        {/* COMPARE */}
        <Route path="/compare" element={<Compare />} />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>}
        />
      </Routes>
    </>
  );
};

export default App;
