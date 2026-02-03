import { useEffect, useState } from "react";
import api from "../services/api";
import "./Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get(`/players?page=${page}`).then(res => {
      setPlayers(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    });
  }, [page]);

  return (
    <div className="players-page">

      <div className="player-list">
        {players.map(p => (
          <div
            key={p.id}
            className="player-row"
            onClick={() => setSelected(p)}
          >
            <h4>{p.name}</h4>
            <span>{p.team?.name}</span>
          </div>
        ))}
      </div>

      {/* Pagination (only Prev / Next) */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>{page}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      {/* Player Detail Panel */}
      {selected && (
        <div className="player-detail">
          <button className="close" onClick={() => setSelected(null)}>×</button>

          <h2>{selected.name}</h2>
          <p className="team">{selected.team?.name}</p>

          <div className="stats-grid">
            <Stat label="Matches" value={selected.stats?.[0]?.matches} />
            <Stat label="Runs" value={selected.stats?.[0]?.runs} />
            <Stat label="Fours" value={selected.stats?.[0]?.fours} />
            <Stat label="Sixes" value={selected.stats?.[0]?.sixes} />
            <Stat label="Best" value={selected.stats?.[0]?.highest} />
            <Stat label="Avg" value={selected.stats?.[0]?.average} />
            <Stat label="SR" value={selected.stats?.[0]?.strike} />
          </div>

          <div className="socials">
            <a href={`https://twitter.com/${selected.name}`} target="_blank">Twitter</a>
            <a href={`https://instagram.com/${selected.name}`} target="_blank">Instagram</a>
            <a href={`https://facebook.com/${selected.name}`} target="_blank">Facebook</a>
          </div>
        </div>
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