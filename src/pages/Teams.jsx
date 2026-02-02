import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Teams.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/teams").then(res => setTeams(res.data || []));
  }, []);

  return (
    <div className="teams-page">
      {teams.map(team => (
        <div
          key={team.id}
          className="team-card"
          onClick={() => team.short && navigate(`/teams/${team.short}`)}
        >
          <h3>{team.name}</h3>
          <p>{team.short}</p>
        </div>
      ))}
    </div>
  );
}
