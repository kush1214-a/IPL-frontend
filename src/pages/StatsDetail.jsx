import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/StatsDetail.css";

export default function StatsDetail() {
  const { statType } = useParams();
  const safeType = statType ?? "";

  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!safeType) return;
    api.get(`/stats/${safeType}`).then(res => setStats(res.data));
  }, [safeType]);

  if (!safeType) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{safeType.replace(/_/g, " ").toUpperCase()}</h1>
      {stats.map((s, i) => (
        <p key={i}>{s.player?.name} — {s.runs}</p>
      ))}
    </div>
  );
}
