import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

/* ================= ROLE DERIVATION =================
   Role backend se nahi aa raha,
   isliye batting / bowling se derive kar rahe hain
==================================================== */

function getPlayerRole(player) {
  const batting = player.batting || "";
  const bowling = player.bowling || "";
  const name = player.name?.toLowerCase() || "";

  // Wicket Keeper detection
  if (
    batting.toLowerCase().includes("wk") ||
    batting.toLowerCase().includes("keeper") ||
    name.includes("dhoni")
  ) {
    return "WICKET-KEEPER";
  }

  // All Rounder
  if (batting && bowling) {
    return "ALL-ROUNDER";
  }

  // Bowler
  if (!batting && bowling) {
    return "BOWLER";
  }

  // Default
  return "BATTER";
}

/* ================= MAIN COMPONENT ================= */

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        setLoading(true);
        const res = await api.get(`/players?page=${page}`);
        setPlayers(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Players fetch error", err);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, [page]);

  return (
    <div className="players-page">
      {/* ========== PLAYER LIST ========== */}
      <div className="players-list">
        {loading ? (
          <p className="center">Loading...</p>
        ) : (
          players.map(player => (
            <div
              key={player.id}
              className="player-row"
              onClick={() => setSelected(player)}
            >
              <h4>{player.name}</h4>
              <span>{player.team?.name}</span>
            </div>
          ))
        )}

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span>{page} / {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ========== RIGHT SIDE POPUP ========== */}
      {selected && (
        <>
          <div className="overlay" onClick={() => setSelected(null)} />

          <div className="player-popup">
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>

            <h2>{selected.name}</h2>
            <p className="team">
              {selected.team?.name} • {getPlayerRole(selected)}
            </p>

            <RoleBasedStats player={selected} />

            <div className="socials">
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= ROLE BASED STATS ================= */

function RoleBasedStats({ player }) {
  const role = getPlayerRole(player);
  const s = player.stats?.[0] || {};

  return (
    <>
      {/* ===== BATTTING ===== */}
      {(role === "BATTER" ||
        role === "ALL-ROUNDER" ||
        role === "BOWLER" ||
        role === "WICKET-KEEPER") && (
        <>
          <h4 className="section-title">Batting</h4>
          <div className="stats-grid">
            <Stat label="Matches" value={s.matches} />
            <Stat label="Runs" value={s.runs} />
            <Stat label="Best" value={s.highest} />
            <Stat label="Average" value={s.average} />
            <Stat label="Strike Rate" value={s.strike} />
            <Stat label="Fours" value={s.fours} />
            <Stat label="Sixes" value={s.sixes} />
          </div>
        </>
      )}

      {/* ===== BOWLING ===== */}
      {(role === "BOWLER" ||
        role === "ALL-ROUNDER" ||
        role === "WICKET-KEEPER") && (
        <>
          <h4 className="section-title">Bowling</h4>
          <div className="stats-grid">
            <Stat label="Overs" value={s.overs} />
            <Stat label="Wickets" value={s.wickets} />
            <Stat label="Best" value={s.bestBowling} />
            <Stat label="Economy" value={s.economy} />
            <Stat label="Avg" value={s.bowlingAverage} />
          </div>
        </>
      )}

      {/* ===== WICKET KEEPING ===== */}
      {role === "WICKET-KEEPER" && (
        <>
          <h4 className="section-title">Wicket Keeping</h4>
          <div className="stats-grid">
            <Stat label="Catches" value={s.catches} />
            <Stat label="Stumpings" value={s.stumpings} />
          </div>
        </>
      )}
    </>
  );
}

/* ================= SMALL STAT BOX ================= */

const Stat = ({ label, value }) => (
  <div className="stat-box">
    <span>{label}</span>
    <b>{value ?? "-"}</b>
  </div>
);
