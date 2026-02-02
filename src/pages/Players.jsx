import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchPlayers();
  }, [page]);

  async function fetchPlayers() {
    try {
      const res = await api.get(`/players?page=${page}&limit=${limit}`);
      setPlayers(res.data.players || []);
    } catch (err) {
      console.error("❌ Players fetch error:", err);
      setPlayers([]);
    }
  }

  return (
    <div className="players-page">

      <div className="players-list">
        {players.length === 0 && <p className="empty">No players found</p>}

        {players.map((p) => (
          <div
            key={p.id}
            className="player-row"
            onClick={() => setSelected(p)}
          >
            <h4>{p.name}</h4>
            <span>{p.team?.name || "—"}</span>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={players.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next ▶
        </button>
      </div>

      {selected && (
        <div className="player-detail">
          <button className="close" onClick={() => setSelected(null)}>✕</button>

          <h2>{selected.name}</h2>
          <p className="team">{selected.team?.name}</p>

          <div className="info">
            <p><b>Country:</b> {selected.country || "—"}</p>
            <p><b>Batting:</b> {selected.batting || "—"}</p>
            <p><b>Bowling:</b> {selected.bowling || "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
