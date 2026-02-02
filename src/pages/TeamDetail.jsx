import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

export default function TeamDetail() {
  const { teamCode } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!teamCode) return;

    api.get(`/teams/${teamCode}`)
      .then(res => setTeam(res.data))
      .catch(() => setError(true));
  }, [teamCode]);

  if (error) return <h2>Invalid team</h2>;
  if (!team) return <h2>Loading...</h2>;

  return (
    <div className="team-detail-page">
      <h1>{team.name}</h1>
      <div className="players-grid">
        {team.players?.map(p => (
          <div key={p.id} className="player-card">
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
