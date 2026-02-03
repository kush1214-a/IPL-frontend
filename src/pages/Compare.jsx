import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // load teams
  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data || []));
  }, []);

  // fetch comparison
  useEffect(() => {
    if (!teamA || !teamB) return;

    setLoading(true);
    api
      .get(`/compare/teams?teamA=${teamA.short}&teamB=${teamB.short}`)
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [teamA, teamB]);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* TEAM SELECT */}
      <div className="compare-select">
        <select onChange={(e) => setTeamA(teams.find(t => t.short === e.target.value))}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.short}>{t.name}</option>
          ))}
        </select>

        <span className="vs">VS</span>

        <select onChange={(e) => setTeamB(teams.find(t => t.short === e.target.value))}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.short}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* TEAM CARDS */}
      {teamA && teamB && (
        <div className="team-cards">
          <TeamCard team={teamA} />
          <TeamCard team={teamB} />
        </div>
      )}

      {loading && <p className="loading">Loading comparison...</p>}

      {/* SIDE BY SIDE COMPARISON */}
      {stats && (
        <div className="compare-table">
          <CompareRow left={stats.playedA} label="Played" right={stats.playedB} />
          <CompareRow left={stats.winsA} label="Won" right={stats.winsB} />
          <CompareRow left={stats.lostA} label="Lost" right={stats.lostB} />
          <CompareRow left={stats.noResultA} label="No Result" right={stats.noResultB} />
          <CompareRow left={stats.highestA} label="Highest Total" right={stats.highestB} />
          <CompareRow left={stats.lowestA} label="Lowest Total" right={stats.lowestB} />
          <CompareRow left={stats.avgRunsA} label="Avg Runs" right={stats.avgRunsB} />
          <CompareRow left={stats.avgWktsA} label="Avg Wickets" right={stats.avgWktsB} />
          <CompareRow left={stats.mostRunsA} label="Most Runs" right={stats.mostRunsB} />
          <CompareRow left={stats.mostWktsA} label="Most Wickets" right={stats.mostWktsB} />
        </div>
      )}
    </div>
  );
}

/* TEAM CARD */
function TeamCard({ team }) {
  return (
    <div className="team-card">
      <img src={team.logo} alt={team.name} />
      <h3>{team.name}</h3>
    </div>
  );
}

/* COMPARISON ROW */
function CompareRow({ left, label, right }) {
  return (
    <div className="compare-row">
      <span className="left">{left ?? "-"}</span>
      <span className="label">{label}</span>
      <span className="right">{right ?? "-"}</span>
    </div>
  );
}
