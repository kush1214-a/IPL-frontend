import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

export default function TeamDetail() {
  const { teamCode } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.get(`/teams/${teamCode}`).then(res => setTeam(res.data));
  }, [teamCode]);

  if (!team) return <h2>Loading...</h2>;

  return (
    <div
      className="team-detail-page"
      style={{ backgroundImage: "url(/bg/ipl.jpg)" }}
    >
      {/* BANNER */}
      <div className="team-banner">
        <img src={team.logo} alt={team.name} />
        <div>
          <h1>{team.name}</h1>
          <p>🏆 {team.titles?.join(", ") || "No Titles"}</p>
        </div>
      </div>

      {/* META */}
      <div className="team-meta">
        <p><b>Captain:</b> {team.captain}</p>
        <p><b>Coach:</b> {team.coach}</p>
        <p><b>Owner:</b> {team.owner}</p>
        <p><b>Venue:</b> {team.venue}</p>
      </div>

      {/* SQUAD */}
      <h2 className="squad-title">Squad ({team.players.length})</h2>

      <div className="squad-grid">
        {team.players.map(p => (
          <div className="player-card" key={p.id}>
            <h4>{p.name}</h4>
            <p>{p.batting} | {p.bowling}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
