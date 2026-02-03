import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

const ITEMS_PER_PAGE = 8;

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get("/players")
      .then((res) => {
        setPlayers(res.data?.data || []);
      })
      .catch((err) => console.error("Players fetch error", err));
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentPlayers = players.slice(start, start + ITEMS_PER_PAGE);

  /* ================= HELPERS ================= */
  const getBatting = (stats) =>
    stats?.find((s) => s.statType.startsWith("batting"));

  const getBowling = (stats) =>
    stats?.find((s) => s.statType.startsWith("bowling"));

  return (
    <div className="players-page">
      {/* LEFT LIST */}
      <div className="players-list">
        {currentPlayers.map((p) => (
          <div
            key={p.id}
            className="player-row"
            onClick={() => setSelected(p)}
          >
            {/* NAME + ROLE */}
            <h4 className="player-name">
              {p.name}
              {p.role && (
                <span className={`role role-${p.role.toLowerCase()}`}>
                  {p.role}
                </span>
              )}
            </h4>

            <span className="team-name">{p.team?.name}</span>
          </div>
        ))}

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ◀ Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ▶
            </button>
          </div>
        )}
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
            {["BATTER", "ALL-ROUNDER", "WICKET-KEEPER"].includes(selected.role) &&
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
            {["BOWLER", "ALL-ROUNDER", "WICKET-KEEPER"].includes(selected.role) &&
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
