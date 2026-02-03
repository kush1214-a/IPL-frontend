import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

export default function StatsDetail() {
  const { statType } = useParams();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!statType) return;

    async function fetchStats() {
      try {
        const res = await api.get(`/stats/${statType}`);
        const rawStats = res.data || [];

        // ✅ REMOVE DUPLICATE PLAYERS
        const uniqueMap = new Map();

        rawStats.forEach((item) => {
          if (!item.player?.id) return;

          // keep first occurrence only
          if (!uniqueMap.has(item.player.id)) {
            uniqueMap.set(item.player.id, item);
          }
        });

        setStats(Array.from(uniqueMap.values()));
      } catch (err) {
        console.error("❌ Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [statType]);

  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }

  if (stats.length === 0) {
    return <h2 className="center">No data available</h2>;
  }

  const title = statType.replace(/_/g, " ").toUpperCase();

  return (
    <div className="stats-page">
      <h1 className="stats-title">{title}</h1>

      <div className="stats-list">
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
            <div key={item.player.id} className="stats-row">
              <span className="rank">{index + 1}</span>
              <span className="name">{item.player.name}</span>
              <span className="value">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
