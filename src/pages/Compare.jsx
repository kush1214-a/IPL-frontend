import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // load teams in dropdown
  useEffect(() => {
    api.get("/teams").then((res) => setTeams(res.data));
  }, []);

  // compare teams
  useEffect(() => {
    if (!teamA || !teamB) return;

    setLoading(true);
    api
      .get(`/compare?teamA=${teamA}&teamB=${teamB}`)
      .then((res) => setResult(res.data))
      .catch(() => setResult(null))
      .finally(() => setLoading(false));
  }, [teamA, teamB]);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* TEAM SELECT */}
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

      {/* LOADING */}
      {loading && <p className="loading">Comparing teams...</p>}

      {/* RESULT */}
      {result && (
        <div className="compare-result">
          {result.map((team) => (
            <div key={team.short} className="compare-card">
              <h2>{team.name}</h2>

              <div className="compare-stat">
                <span>Players</span>
                <b>{team.players}</b>
              </div>

              <div className="compare-stat">
                <span>Total Matches</span>
                <b>{team.totalMatches}</b>
              </div>

              <div className="compare-stat">
                <span>Total Runs</span>
                <b>{team.totalRuns}</b>
              </div>

              <div className="compare-stat">
                <span>Total Wickets</span>
                <b>{team.totalWickets}</b>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
