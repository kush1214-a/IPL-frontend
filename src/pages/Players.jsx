import { useEffect, useState } from "react";
import api from "../services/api";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    api
      .get(`/players?page=${page}&limit=${limit}`)
      .then(res => setPlayers(Array.isArray(res.data) ? res.data : []));
  }, [page]);

  return (
    <div>
      <h1>Players</h1>

      {players.map(p => (
        <div key={p.id}>
          {p.name} — {p.team?.name}
        </div>
      ))}

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
