import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);

  /* 🔥 PAGINATION STATE */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH PLAYERS ================= */
  useEffect(() => {
    api
      .get(`/players?page=${page}`)
      .then((res) => {
        setPlayers(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Players fetch error:", err);
      });
  }, [page]);

  /* ================= ROLE FALLBACK ================= */
  const getRole = (player) => {
    if (player.role) return player.role;
    if (player.batting && player.bowling) return "ALL-ROUNDER";
    if (player.batting) return "BATTER";
    if (player.bowling) return "BOWLER";
    return "PLAYER";
  };

  /* ================= STAT PICKERS ================= */
  const getBatting = (stats = []) =>
    stats.find((s) => s.statType?.startsWith("batting"));

  const getBowling = (stats = []) =>
    stats.find((s) => s.statType?.startsWith("bowling"));

  /* ================= VISIBILITY RULES ================= */
  const showBatting = (role) =>
    ["BATTER", "ALL-ROUNDER", "WICKET-KEEPER"].includes(role);

  const showBowling = (role) =>
    ["ALL-ROUNDER", "BOWLER"].includes(role);

  return (
    <div className="players-page">
      {/* ================= PLAYER LIST ================= */}
      <div className="players-list">
        {players.map((p) => (
          <div
            key={p.id}
            className="player-row"
            onClick={() => setSelected(p)}
          >
            <h4>{p.name}</h4>
            <span>{p.team?.name}</span>
          </div>
        ))}

        {/* 🔥 PAGINATION CONTROLS */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ◀ Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* ================= PLAYER MODAL ================= */}
      {selected && (() => {
        const role = getRole(selected);
        const batting = getBatting(selected.stats);
        const bowling = getBowling(selected.stats);

        return (
          <>
            <div className="overlay" onClick={() => setSelected(null)} />

            <div className="player-popup">
              <button className="close" onClick={() => setSelected(null)}>
                ×
              </button>

              <h2>{selected.name}</h2>
              <p className="team">
                {selected.team?.name} • {role}
              </p>

              {/* ===== BATTTING ===== */}
              {showBatting(role) && batting && (
                <>
                  <div className="section-title">Batting</div>
                  <div className="stats-grid">
                    <Box label="Matches" value={batting.matches} />
                    <Box label="Runs" value={batting.runs} />
                    <Box label="Best" value={batting.highest} />
                    <Box label="Average" value={batting.average ?? "-"} />
                    <Box label="Strike Rate" value={batting.strike ?? "-"} />
                    <Box label="Fours" value={batting.fours} />
                    <Box label="Sixes" value={batting.sixes} />
                  </div>
                </>
              )}

              {/* ===== BOWLING ===== */}
              {showBowling(role) && bowling && (
                <>
                  <div className="section-title">Bowling</div>
                  <div className="stats-grid">
                    <Box label="Matches" value={bowling.matches} />
                    <Box label="Wickets" value={bowling.wickets} />
                    <Box label="Average" value={bowling.average ?? "-"} />
                    <Box label="Strike" value={bowling.strike ?? "-"} />
                  </div>
                </>
              )}
            </div>
          </>
        );
      })()}
    </div>
  );
}

/* ================= SMALL STAT BOX ================= */
function Box({ label, value }) {
  return (
    <div className="stat-box">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
