import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import Team from "./pages/Team";
import StatsDetail from "./pages/StatsDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:short" element={<Team />} />
        <Route path="/stats/:statType" element={<StatsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
