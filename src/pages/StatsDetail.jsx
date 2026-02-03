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

        // ✅ STEP 1: Sort DESC by value
        const sorted = [...res.data].sort((a, b) => {
          const va =
            a.runs ??
            a.average ??
            a.strikeRate ??
            a.wickets ??
            0;

          const vb =
            b.runs ??
            b.average ??
            b.strikeRate ??
            b.wickets ??
            0;

          return vb - va;
        });

        // ✅ STEP 2: Take TOP 20 (NOT unique by player)
        setStats(sorted.slice(0, 20));
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
          <div className="stats-row" key={i}>
            <span className="rank">{i + 1}</span>
            <span className="name">
              {item.player?.name || "Unknown"}
            </span>
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
