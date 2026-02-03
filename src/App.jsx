import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Players from "./pages/Players";
import Compare from "./pages/Compare";
import StatsDetail from "./pages/StatsDetail";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamCode" element={<TeamDetail />} />
        <Route path="/players" element={<Players />} />
        <Route path="/stats/:statType" element={<StatsDetail />} />
        <Route path="/compare" element={<Compare />} />

        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>}
        />
      </Routes>
    </>
  );
}
