import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch teams for dropdown
  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data));
  }, []);

  // fetch comparison
  useEffect(() => {
    if (!teamA || !teamB) return;

    setLoading(true);
    api
      .get(`/compare?teamA=${teamA}&teamB=${teamB}`)
      .then((res) => setResult(res.data))
      .finally(() => setLoading(false));
  }, [teamA, teamB]);

  return (
    <div className="compare-page">
      <h1 className="title">HEAD TO HEAD</h1>

      {/* SELECTORS */}
      <div className="compare-select">
        <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.short}>
              {t.name}
            </option>
          ))}
        </select>

        <span className="vs">VS</span>

        <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
          <option value="">+ Add Team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.short}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* RESULT */}
      {loading && <p className="loading">Loading comparison...</p>}

      {result && (
        <div className="compare-result">
          {result.map((t) => (
            <div key={t.short} className="team-card">
              <h2>{t.name}</h2>

              <div className="stat">Players: <b>{t.players}</b></div>
              <div className="stat">Total Matches: <b>{t.totalMatches}</b></div>
              <div className="stat">Total Runs: <b>{t.totalRuns}</b></div>
              <div className="stat">Total Wickets: <b>{t.totalWickets}</b></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
