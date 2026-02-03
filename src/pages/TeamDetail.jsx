import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

const TEAM_INFO = {
  RCB: {
    captain: "Faf du Plessis",
    coach: "Andy Flower",
    owner: "United Spirits",
    venue: "M. Chinnaswamy Stadium",
    titles: [2025]
  },
  CSK: {
    captain: "MS Dhoni",
    coach: "Stephen Fleming",
    owner: "CSK Cricket Ltd",
    venue: "M. A. Chidambaram Stadium",
    titles: [2010, 2011, 2018, 2021, 2023]
  }
};

export default function TeamDetail() {
  const { teamCode } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.get(`/teams/${teamCode}`).then(res => setTeam(res.data));
  }, [teamCode]);

  if (!team) return <h2 className="loading">Loading...</h2>;

  const info = TEAM_INFO[teamCode] || {};

  return (
    <div className="team-detail-page">
      {/* HEADER */}
      <div className="team-header">
        <img src={team.logo} alt={team.name} className="team-logo" />

        <div className="team-meta">
          <h1>{team.name}</h1>

          <p className="titles">
            🏆 {info.titles?.length ? info.titles.join(", ") : "No titles"}
          </p>

          <p><b>Captain:</b> {info.captain}</p>
          <p><b>Coach:</b> {info.coach}</p>
          <p><b>Owner:</b> {info.owner}</p>
          <p><b>Venue:</b> {info.venue}</p>
        </div>
      </div>

      {/* SQUAD */}
      <h2 className="squad-title">Squad ({team.players.length})</h2>

      <div className="squad-grid">
        {team.players.map(p => (
          <div key={p.id} className="player-card">
            <h4>{p.name}</h4>
            <p>{p.batting || "—"} | {p.bowling || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
