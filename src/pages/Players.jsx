import { useEffect, useState } from "react";
import axios from "axios";
import "./Players.css";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/players")
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  const getBatting = (stats) =>
    stats.find(s => s.statType === "batting_t20");

  const getBowling = (stats) =>
    stats.find(s => s.statType === "bowling_t20");

  const showBatting = (role) =>
    ["BATTER", "ALL-ROUNDER", "BOWLER", "WICKET-KEEPER"].includes(role);

  const showBowling = (role) =>
    ["ALL-ROUNDER", "BOWLER", "WICKET-KEEPER"].includes(role);

  return (
    <div className="players-page">
      <div className="players-list">
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

      {selected && (
        <div className="player-modal">
          <button className="close" onClick={() => setSelected(null)}>×</button>

          <h2>{selected.name}</h2>
          <p className="sub">
            {selected.team?.name} • {selected.role}
          </p>

          {/* 🏏 BATTTING */}
          {showBatting(selected.role) && getBatting(selected.stats) && (
            <>
              <h3>BATTTING</h3>
              <div className="grid">
                <Box label="Matches" value={getBatting(selected.stats).matches} />
                <Box label="Runs" value={getBatting(selected.stats).runs} />
                <Box label="Best" value={getBatting(selected.stats).highest} />
                <Box label="Average" value={getBatting(selected.stats).average ?? "-"} />
                <Box label="Strike Rate" value={getBatting(selected.stats).strike ?? "-"} />
                <Box label="Fours" value={getBatting(selected.stats).fours} />
                <Box label="Sixes" value={getBatting(selected.stats).sixes} />
              </div>
            </>
          )}

          {/* 🎯 BOWLING */}
          {showBowling(selected.role) && getBowling(selected.stats) && (
            <>
              <h3>BOWLING</h3>
              <div className="grid">
                <Box label="Matches" value={getBowling(selected.stats).matches} />
                <Box label="Wickets" value={getBowling(selected.stats).wickets} />
                <Box label="Economy" value={getBowling(selected.stats).average ?? "-"} />
                <Box label="Strike" value={getBowling(selected.stats).strike ?? "-"} />
              </div>
            </>
          )}

          <div className="social">
            <span>Twitter</span>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div className="stat-box">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
