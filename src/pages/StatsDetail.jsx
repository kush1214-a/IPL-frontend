import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

const StatsDetail = () => {
  const { statType } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get(`/stats/${statType}`);
        setStats(res.data || []);
      } catch (err) {
        console.error("❌ Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [statType]);

  const title = statType.replace(/_/g, " ").toUpperCase();

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (stats.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No data available</h2>;
  }

  return (
    <div className="stats-page">
      <h1 className="stats-title">{title}</h1>

      <div className="leaderboard">
        {stats.map((item, index) => {
          const value =
            item.runs ??
            item.highest ??
            item.average ??
            item.strike ??
            item.fours ??
            item.sixes ??
            "-";

          return (
            <div key={item.id} className="leader-row">
              <div className="rank">{index + 1}</div>
              <div className="player-name">
                {item.player?.name || "Unknown Player"}
              </div>
              <div className="stat-value">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsDetail;
