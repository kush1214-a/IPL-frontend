import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

  useEffect(() => {
    api.get("/teams").then((res) => {
      setTeams(res.data || []);
    });
  }, []);

  const handleSelectA = (id) => {
    const t = teams.find((x) => x.id === Number(id));
    setTeamA(t || null);
  };

  const handleSelectB = (id) => {
    const t = teams.find((x) => x.id === Number(id));
    setTeamB(t || null);
  };

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* DROPDOWNS */}
      <div className="compare-selectors">
        <select onChange={(e) => handleSelectA(e.target.value)}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <span className="vs">VS</span>

        <select onChange={(e) => handleSelectB(e.target.value)}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* CARDS */}
      <div className="compare-cards">
        <TeamCard team={teamA} />
        <TeamCard team={teamB} />
      </div>

      {/* COMPARISON */}
      {teamA && teamB && (
        <div className="compare-stats">
          <StatRow label="Players" a={teamA.playersCount} b={teamB.playersCount} />
          <StatRow label="Total Matches" a={teamA.totalMatches} b={teamB.totalMatches} />
          <StatRow label="Total Runs" a={teamA.totalRuns} b={teamB.totalRuns} />
          <StatRow label="Total Wickets" a={teamA.totalWickets} b={teamB.totalWickets} />
        </div>
      )}
    </div>
  );
}

/* TEAM CARD */
function TeamCard({ team }) {
  if (!team) {
    return (
      <div className="team-card empty">
        <p>Select Team</p>
      </div>
    );
  }

  return (
    <div className="team-card">
      <img src={team.logo} alt={team.name} />
      <h3>{team.name}</h3>
    </div>
  );
}

/* STAT ROW */
function StatRow({ label, a, b }) {
  return (
    <div className="stat-row">
      <span>{a ?? "-"}</span>
      <b>{label}</b>
      <span>{b ?? "-"}</span>
    </div>
  );
}
