import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Compare from "./pages/Compare";
import Charts from "./pages/Charts";
import StatsPage from "./pages/StatsDetail";
import Navbar from "./components/Navbar";
import StatsDetail from "./pages/StatsDetail";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/players" element={<Players />} />

        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:short" element={<TeamDetail />} />

        <Route path="/stats/:type" element={<StatsDetail/>} />

        <Route path="/charts" element={<Charts />} />

        <Route path="/compare" element={<Compare />} />

        {/* fallback */}
        <Route path="*" element={<p style={{ padding: 20 }}>Page not found</p>} />
      </Routes>
    </>
  );
}
