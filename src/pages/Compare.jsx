import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  /* LOAD TEAMS */
  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data || []));
  }, []);

  /* COMPARE TEAMS */
  useEffect(() => {
    if (!left || !right) return;

    setLoading(true);
    api
      .get(`/compare/teams?teamA=${left.short}&teamB=${right.short}`)
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [left, right]);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* TEAM CARDS */}
      <div className="compare-cards">
        <TeamCard side="left" team={left} teams={teams} onSelect={setLeft} />
        <div className="vs">VS</div>
        <TeamCard side="right" team={right} teams={teams} onSelect={setRight} />
      </div>

      {/* LOADING */}
      {loading && <p className="loading">Comparing teams...</p>}

      {/* RESULT */}
      {stats && (
        <div className="compare-stats">
          <div className="stat-row">
            <span>{stats.teamAWins}</span>
            <b>Wins</b>
            <span>{stats.teamBWins}</span>
          </div>

          <div className="stat-row">
            <span>{stats.matches}</span>
            <b>Matches</b>
            <span>{stats.matches}</span>
          </div>

          <div className="stat-row">
            <span>-</span>
            <b>No Result</b>
            <span>{stats.noResult}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= TEAM CARD ================= */

function TeamCard({ team, teams, onSelect }) {
  return (
    <div className="team-card">
      {!team ? (
        <select
          className="team-select"
          onChange={(e) =>
            onSelect(teams.find((t) => t.short === e.target.value))
          }
        >
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.short}>
              {t.name}
            </option>
          ))}
        </select>
      ) : (
        <>
          <img src={team.logo} alt={team.name} />
          <h3>{team.name}</h3>
        </>
      )}
    </div>
  );
}
