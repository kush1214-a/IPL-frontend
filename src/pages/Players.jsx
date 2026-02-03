import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api
      .get("/players")
      .then((res) => {
        // backend response: { data, page, totalPages }
        setPlayers(res.data?.data || []);
      })
      .catch((err) => console.error("Players fetch error", err));
  }, []);

  const getBatting = (stats) =>
    stats.find((s) => s.statType.startsWith("batting"));

  const getBowling = (stats) =>
    stats.find((s) => s.statType.startsWith("bowling"));

  return (
    <div className="players-page">
      {/* LEFT LIST */}
      <div className="players-list">
        {players.map((p) => (
          <div
            key={p.id}
            className="player-row"
            onClick={() => setSelected(p)}
          >
            <h4>{p.name}</h4>
            <span>
              {p.team?.name} •{" "}
              <strong className={`role role-${p.role?.toLowerCase()}`}>
                {p.role}
              </strong>
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT POPUP */}
      {selected && (
        <>
          <div className="overlay" onClick={() => setSelected(null)} />

          <div className="player-popup">
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>

            <h2>{selected.name}</h2>
            <p className="team">
              {selected.team?.name} •{" "}
              <span className={`role role-${selected.role?.toLowerCase()}`}>
                {selected.role}
              </span>
            </p>

            {/* BATTTING */}
            {["BATTER", "ALL-ROUNDER"].includes(selected.role) &&
              getBatting(selected.stats) && (
                <>
                  <div className="section-title">BATTING</div>
                  <div className="stats-grid">
                    <Stat label="Matches" value={getBatting(selected.stats).matches} />
                    <Stat label="Runs" value={getBatting(selected.stats).runs} />
                    <Stat label="Best" value={getBatting(selected.stats).highest} />
                    <Stat label="Average" value={getBatting(selected.stats).average ?? "-"} />
                    <Stat label="Strike" value={getBatting(selected.stats).strike ?? "-"} />
                    <Stat label="Fours" value={getBatting(selected.stats).fours} />
                    <Stat label="Sixes" value={getBatting(selected.stats).sixes} />
                  </div>
                </>
              )}

            {/* BOWLING */}
            {["BOWLER", "ALL-ROUNDER"].includes(selected.role) &&
              getBowling(selected.stats) && (
                <>
                  <div className="section-title">BOWLING</div>
                  <div className="stats-grid">
                    <Stat label="Matches" value={getBowling(selected.stats).matches} />
                    <Stat label="Wickets" value={getBowling(selected.stats).wickets} />
                    <Stat label="Average" value={getBowling(selected.stats).average ?? "-"} />
                    <Stat label="Strike" value={getBowling(selected.stats).strike ?? "-"} />
                  </div>
                </>
              )}
          </div>
        </>
      )}
    </div>
  );
}

/* SMALL STAT BOX */
function Stat({ label, value }) {
  return (
    <div className="stat-box">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
