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
    <div>
      <h1>{team.name}</h1>
      <h3>Players</h3>
      {team.players.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}
    </div>
  );
}
