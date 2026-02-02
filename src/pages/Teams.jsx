import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Team.css";

export default function Team() {
  const { short } = useParams();     // URL param
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🛡️ ABSOLUTE GUARD
  if (!short) {
    return <h2 style={{ textAlign: "center" }}>Invalid team</h2>;
  }

  useEffect(() => {
    fetchTeam();
    // eslint-disable-next-line
  }, [short]);

  async function fetchTeam() {
    try {
      setLoading(true);
      const res = await api.get(`/teams/${short}`);
      setTeam(res.data);
    } catch (err) {
      console.error("❌ Team fetch error", err);
      setError("Team not found");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center" }}>{error}</h2>;
  }

  return (
    <div className="team-page">
      <h1>{team.name}</h1>
      <h3>Players</h3>

      <ul className="player-list">
        {team.players?.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
