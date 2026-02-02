import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

export default function StatsDetail() {
  const { statType } = useParams();
  const safeType = statType || "";

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!safeType) return;

    (async () => {
      try {
        const res = await api.get(`/stats/${safeType}`);
        setStats(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [safeType]);

  if (!safeType) {
    return <h2 className="stats-error">Invalid stats</h2>;
  }

  if (loading) {
    return <h2 className="stats-loading">Loading...</h2>;
  }

  if (stats.length === 0) {
    return <h2 className="stats-empty">No data available</h2>;
  }

  const title = safeType.replace(/_/g, " ").toUpperCase();

  return (
    <div className="stats-page">
      <h1 className="stats-title">{title}</h1>

      <div className="stats-list">
        {stats.map((item, index) => (
          <div className="stats-row" key={item.id ?? index}>
            <span className="rank">{index + 1}</span>
            <span className="player">
              {item.player?.name || "Unknown"}
            </span>
            <span className="value">
              {item.runs ??
                item.highest ??
                item.average ??
                item.strike ??
                "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
