import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

export default function StatsDetail() {
  const { statType } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get(`/stats/${statType}`);
        setStats(res.data || []);
      } catch (err) {
        console.error("Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [statType]);

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="stats-page">
      <h1 className="stats-title">
        {statType.replace(/_/g, " ").toUpperCase()}
      </h1>

      {stats.map((row, index) => (
        <div className="stat-row" key={index}>
          <span className="rank">{index + 1}</span>
          <span className="player-name">
            {row.player?.name || "Unknown"}
          </span>
          <span className="stat-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
