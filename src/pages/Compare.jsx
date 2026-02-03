import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Compare.css";

const TEAM_COLORS = {
  CSK: ["#fdb913", "#f85c00"],
  MI: ["#005da0", "#003b73"],
  RCB: ["#c81e2b", "#000000"],
  DC: ["#17479e", "#c62828"],
  KKR: ["#3a225d", "#f3c623"],
  RR: ["#254aa5", "#f06292"],
  SRH: ["#f15a29", "#000000"],
  GT: ["#cfa54a", "#1c1c1c"],
  LSG: ["#2bb6a3", "#005f56"],
  PBKS: ["#d71920", "#8b0000"]
};

export default function Compare() {
  const [teams, setTeams] = useState([]);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/teams").then(res => setTeams(res.data || []));
  }, []);

  useEffect(() => {
    if (left && right) {
      api
        .get(`/compare/teams?teamA=${left.short}&teamB=${right.short}`)
        .then(res => setStats(res.data));
    }
  }, [left, right]);

  return (
    <div className="compare-page">
      <h1 className="compare-title">HEAD TO HEAD</h1>

      {/* ===== TEAM CARDS ===== */}
      <div className="compare-cards">
        <TeamCard
          team={left}
          teams={teams}
          onSelect={setLeft}
          side="left"
        />

        <div className="vs">VS</div>

        <TeamCard
          team={right}
          teams={teams}
          onSelect={setRight}
          side="right"
        />
      </div>

      {/* ===== STATS ===== */}
      {stats && (
        <div className="compare-stats">
          {Object.entries(stats).map(([key, value]) => (
            <div className="stat-row" key={key}>
              <span>{value.teamA}</span>
              <span className="stat-label">{key}</span>
              <span>{value.teamB}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function TeamCard({ team, teams, onSelect, side }) {
  const colors = team ? TEAM_COLORS[team.short] : ["#ddd", "#bbb"];

  return (
    <div
      className="team-select-card"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
      }}
    >
      {!team ? (
        <select onChange={e => {
          const selected = teams.find(t => t.short === e.target.value);
          onSelect(selected);
        }}>
          <option value="">+ Add Team</option>
          {teams.map(t => (
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
