import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data || []));
  }, []);

  useEffect(() => {
    if (!left || !right) return;

    api
      .get(`/compare/teams?teamA=${left.short}&teamB=${right.short}`)
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, [left, right]);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* SELECT */}
      <div className="compare-select">
        <select onChange={(e) => setLeft(teams.find(t => t.short === e.target.value))}>
          <option value="">Select Team</option>
          {teams.map(t => (
            <option key={t.id} value={t.short}>{t.name}</option>
          ))}
        </select>

        <span className="vs">VS</span>

        <select onChange={(e) => setRight(teams.find(t => t.short === e.target.value))}>
          <option value="">Select Team</option>
          {teams.map(t => (
            <option key={t.id} value={t.short}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* TEAM CARDS */}
      <div className="compare-cards">
        {left && <TeamCard team={left} />}
        {right && <TeamCard team={right} />}
      </div>

      {/* STATS */}
      {stats && (
        <div className="compare-stats">
          <div>{stats.teamA} Wins: {stats.teamAWins}</div>
          <div>{stats.teamB} Wins: {stats.teamBWins}</div>
          <div>Matches: {stats.matches}</div>
        </div>
      )}
    </div>
  );
}

/* ================= TEAM CARD ================= */

function TeamCard({ team }) {
  return (
    <div className="team-card">
      <div className="team-logo-box">
        <img src={team.logo} alt={team.name} />
      </div>
      <h3>{team.name}</h3>
    </div>
  );
}
