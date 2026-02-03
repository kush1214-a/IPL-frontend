import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

export default function TeamDetail() {
  const { teamCode } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/teams/${teamCode}`);
      setTeam(res.data);
    })();
  }, [teamCode]);

  if (!team) return <h2>Loading...</h2>;

  return (
    <div className="team-detail-page">
      <div className="team-banner">
        <img src={team.logo} />
        <h1>{team.name}</h1>

        <div className="meta">
          <p><b>Captain:</b> {team.captain}</p>
          <p><b>Coach:</b> {team.coach}</p>
          <p><b>Owner:</b> {team.owner}</p>
          <p><b>Venue:</b> {team.venue}</p>
          <p><b>Titles:</b> {team.titles.join(", ")}</p>
        </div>
      </div>

      <h2 className="squad-title">Squad ({team.players.length})</h2>

      <div className="squad-grid">
        {team.players.map((p) => (
          <div className="player-card" key={p.id}>
            <h4>{p.name}</h4>
            <p>{p.batting} | {p.bowling}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
