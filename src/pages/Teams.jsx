import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Teams.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/teams");
        setTeams(res.data || []);
      } catch (err) {
        console.error("Teams fetch error", err);
        setTeams([]);
      }
    })();
  }, []);

  return (
    <div className="teams-page">
      <h1>IPL Teams</h1>
      <div className="teams-grid">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            onClick={() => {
              if (!team.short) return; // FIX: safe route
              navigate(`/teams/${team.short}`);
            }}
          >
            <h3>{team.name}</h3>
            <p>{team.short}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
