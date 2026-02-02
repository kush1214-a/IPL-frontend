import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

export default function StatsDetail() {
  const { statType } = useParams();
  const safeType = statType ?? "";

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!safeType) return;

    (async () => {
      try {
        const res = await api.get(`/stats/${safeType}`);
        setStats(res.data || []);
      } catch (err) {
        console.error("Stats fetch error", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [safeType]);

  if (!safeType || loading) {
    return <h2>Loading...</h2>;
  }

  const title = safeType.replace(/_/g, " ").toUpperCase();

  return (
    <div className="stats-page">
      <h1>{title}</h1>
      {stats.map((item, index) => (
        <div key={item.id ?? index}>
          <span>{index + 1}</span>
          <span>{item.player?.name || "-"}</span>
          <span>{item.runs ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}
