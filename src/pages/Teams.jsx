import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Teams.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.get("/teams");
      setTeams(res.data || []);
    })();
  }, []);

  return (
    <div className="teams-page">
      <h1 className="teams-title">IPL Teams</h1>

      <div className="teams-grid">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            onClick={() => navigate(`/teams/${team.short}`)}
          >
            <img src={team.logo} className="team-logo" />
            <h3>{team.name}</h3>
            <p className="team-short">{team.short}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
