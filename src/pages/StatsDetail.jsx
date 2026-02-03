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

    (async () => {
      try {
        const res = await api.get(`/stats/${statType}`);

        // 🔥 REMOVE DUPLICATES BY PLAYER ID
        const unique = [];
        const seen = new Set();

        for (const row of res.data || []) {
          const pid = row.player?.id;
          if (!pid || seen.has(pid)) continue;
          seen.add(pid);
          unique.push(row);
        }

        setStats(unique);
      } catch (err) {
        console.error("Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [statType]);

  if (loading) return <h2 className="center">Loading...</h2>;

  const title = statType.replace(/_/g, " ").toUpperCase();

  return (
    <div className="stats-page">
      <h1 className="stats-title">{title}</h1>

      <div className="stats-list">
        {stats.map((item, i) => (
          <div className="stats-row" key={item.player.id}>
            <span className="rank">{i + 1}</span>
            <span className="name">{item.player.name}</span>
            <span className="value">
              {item.runs ??
               item.average ??
               item.strikeRate ??
               item.wickets ??
               "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
