import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Teams.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data));
  }, []);

  return (
    <div className="teams-page">
      <h1 className="teams-title">TEAMS</h1>

      <div className="teams-grid">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            onClick={() => navigate(`/teams/${team.short}`)} // ✅ VERY IMPORTANT
          >
            <img src={team.logo} alt={team.name} />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
