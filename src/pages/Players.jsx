import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchPlayers();
  }, [page]);

  async function fetchPlayers() {
    try {
      const res = await api.get(`/players?page=${page}&limit=${limit}`);
      setPlayers(res.data.players || []);
    } catch {
      setPlayers([]);
    }
  }

  return (
    <div className="players-page">
      {players.map(p => (
        <div key={p.id} className="player-row">
          <h4>{p.name}</h4>
          <span>{p.team?.name || "-"}</span>
        </div>
      ))}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button disabled={players.length < limit} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
