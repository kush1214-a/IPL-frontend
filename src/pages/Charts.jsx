import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Charts() {
  const [topPlayers, setTopPlayers] = useState([]);
  const [teamRuns, setTeamRuns] = useState([]);

  useEffect(() => {
    fetchTopPlayers();
    fetchTeamRuns();
  }, []);

  // 🔹 Top run scorers
  async function fetchTopPlayers() {
    try {
      const res = await api.get("/stats/top-runs");
      setTopPlayers(res.data || []);
    } catch (err) {
      console.error("Top players error", err);
    }
  }

  // 🔹 Team-wise total runs
  async function fetchTeamRuns() {
    try {
      const res = await api.get("/stats/team-runs");
      setTeamRuns(res.data || []);
    } catch (err) {
      console.error("Team runs error", err);
    }
  }

  /* ================= BAR CHART ================= */
  const barData = {
    labels: topPlayers.map(p => p.name),
    datasets: [
      {
        label: "Runs",
        data: topPlayers.map(p => p.totalRuns),
        backgroundColor: "#f7b500",
      },
    ],
  };

  /* ================= PIE CHART ================= */
  const pieData = {
    labels: teamRuns.map(t => t.team),
    datasets: [
      {
        data: teamRuns.map(t => t.totalRuns),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
          "#FF9800",
          "#795548",
          "#03A9F4",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>IPL Insights 📊</h2>

      <div style={{ maxWidth: "800px", marginBottom: "50px" }}>
        <h3>Top Run Scorers</h3>
        {topPlayers.length === 0 ? (
          <p>Loading chart...</p>
        ) : (
          <Bar data={barData} />
        )}
      </div>

      <div style={{ maxWidth: "600px" }}>
        <h3>Team-wise Total Runs</h3>
        {teamRuns.length === 0 ? (
          <p>Loading chart...</p>
        ) : (
          <Pie data={pieData} />
        )}
      </div>
    </div>
  );
}
