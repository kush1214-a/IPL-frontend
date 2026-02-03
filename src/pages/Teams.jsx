import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Teams.css";

/* ===== TEAM COLOR MAP ===== */
const TEAM_COLORS = {
  GT: "#cfa54a",
  RR: "#254aa5",
  RCB: "#c81e2b",
  LSG: "#2bb6a3",
  DC: "#17479e",
  SRH: "#f15a29",
  MI: "#005da0",
  CSK: "#fdb913",
  PBKS: "#d71920",
  KKR: "#3a225d"
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await api.get("/teams");
        setTeams(res.data || []);
      } catch (err) {
        console.error("❌ Teams fetch error", err);
        setTeams([]);
      }
    }
    fetchTeams();
  }, []);

  return (
    <div className="teams-page">
      <h1 className="teams-title">IPL Teams</h1>

      <div className="teams-grid">
        {teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            style={{ "--team-color": TEAM_COLORS[team.short] || "#ffffff" }}
            onClick={() => navigate(`/teams/${team.short}`)}
          >
            <img
              src={team.logo}
              alt={team.name}
              className="team-logo"
            />
            <h3>{team.name}</h3>
            <span className="team-short">{team.short}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
