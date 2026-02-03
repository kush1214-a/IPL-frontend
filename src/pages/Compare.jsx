import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data || []));
  }, []);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* DROPDOWN LAYER */}
      <div className="compare-select">
        <select
          value={left?.id || ""}
          onChange={(e) =>
            setLeft(teams.find(t => t.id === Number(e.target.value)))
          }
        >
          <option value="">+ Add Team</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <span className="vs">VS</span>

        <select
          value={right?.id || ""}
          onChange={(e) =>
            setRight(teams.find(t => t.id === Number(e.target.value)))
          }
        >
          <option value="">+ Add Team</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* CARDS */}
      <div className="compare-cards">
        {left && <TeamCard team={left} />}
        {right && <TeamCard team={right} />}
      </div>
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div className="team-card">
      <img src={team.logo} alt={team.name} />
      <h3>{team.name}</h3>
    </div>
  );
}
