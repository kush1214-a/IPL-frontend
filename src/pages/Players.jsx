import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

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
        console.error(err);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [page]);

  return (
    <div
      className="players-page"
      style={{ backgroundImage: "url(/bg/ipl.jpg)" }}
    >
      {/* ===== PLAYER LIST ===== */}
      <div className="players-list">
        {loading ? (
          <p className="center">Loading...</p>
        ) : (
          players.map(p => (
            <div
              key={p.id}
              className="player-row"
              onClick={() => setSelected(p)}
            >
              <h4>{p.name}</h4>
              <span>{p.team?.name}</span>
            </div>
          ))
        )}

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span>{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* ===== SIDE POPUP ===== */}
      {selected && (
        <>
          <div className="overlay" onClick={() => setSelected(null)} />

          <div className="player-popup">
            <button className="close" onClick={() => setSelected(null)}>×</button>

            <h2>{selected.name}</h2>
            <p className="team">{selected.team?.name}</p>

            <div className="stats-grid">
              <Stat label="Matches" value={selected.stats?.[0]?.matches} />
              <Stat label="Runs" value={selected.stats?.[0]?.runs} />
              <Stat label="Fours" value={selected.stats?.[0]?.fours} />
              <Stat label="Sixes" value={selected.stats?.[0]?.sixes} />
              <Stat label="Best" value={selected.stats?.[0]?.highest} />
              <Stat label="Average" value={selected.stats?.[0]?.average} />
              <Stat label="Strike Rate" value={selected.stats?.[0]?.strike} />
            </div>

          </div>
        </>
      )}
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="stat-box">
    <span>{label}</span>
    <b>{value ?? "-"}</b>
  </div>
);
