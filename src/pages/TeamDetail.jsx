import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

/* ===================== */
/* CONSTANT DATA */
/* ===================== */

const TEAM_INFO = {
  CSK: { captain: "MS Dhoni", coach: "Stephen Fleming", owner: "Chennai Super Kings Ltd", venue: "M. A. Chidambaram Stadium" },
  MI: { captain: "Hardik Pandya", coach: "Mark Boucher", owner: "Indiawin Sports", venue: "Wankhede Stadium" },
  RR: { captain: "Sanju Samson", coach: "Kumar Sangakkara", owner: "Royal Multisport", venue: "Sawai Mansingh Stadium" },
  RCB: { captain: "Faf du Plessis", coach: "Andy Flower", owner: "United Spirits", venue: "M. Chinnaswamy Stadium" },
  KKR: { captain: "Shreyas Iyer", coach: "Chandrakant Pandit", owner: "Knight Riders Group", venue: "Eden Gardens" },
  SRH: { captain: "Pat Cummins", coach: "Daniel Vettori", owner: "SUN Group", venue: "Rajiv Gandhi Stadium" },
  DC: { captain: "Rishabh Pant", coach: "Ricky Ponting", owner: "JSW–GMR", venue: "Arun Jaitley Stadium" },
  PBKS: { captain: "Shikhar Dhawan", coach: "Trevor Bayliss", owner: "KPH Dream Cricket", venue: "IS Bindra Stadium" },
  GT: { captain: "Shubman Gill", coach: "Ashish Nehra", owner: "CVC Capital", venue: "Narendra Modi Stadium" },
  LSG: { captain: "KL Rahul", coach: "Justin Langer", owner: "RPSG Group", venue: "Ekana Stadium" }
};

const TEAM_TITLES = {
  CSK: [2010, 2011, 2018, 2021, 2023],
  MI: [2013, 2015, 2017, 2019, 2020],
  GT: [2022],
  KKR: [2012, 2014, 2024],
  RR: [2008],
  SRH: [2016],
  RCB: [2025],
  DC: [],
  PBKS: [],
  LSG: []
};

/* ===================== */
/* COMPONENT */
/* ===================== */

const TeamDetail = () => {
  const { teamCode } = useParams();

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await api.get(`/teams/${teamCode}`);
        setTeam(res.data);
        setPlayers(res.data.players || []);
      } catch (err) {
        console.error("❌ Team fetch error", err);
        setError(true);
      }
    }

    fetchTeam();
  }, [teamCode]);

  if (error) {
    return <h2 className="team-error">❌ Team not found</h2>;
  }

  if (!team) {
    return <h2 className="team-loading">Loading...</h2>;
  }

  /* ===== SAFE LOOKUPS ===== */
  const info = TEAM_INFO[teamCode] || {};
  const titles = TEAM_TITLES[teamCode] || [];

  return (
    <div className="team-detail-page">

      {/* ===== HEADER ===== */}
      <div className="team-header">
        <div className="team-logo">
          <img src={team.logo} alt={team.name} />
        </div>

        <div className="team-info">
          <h1>{team.name}</h1>

          <p className="team-titles">
            🏆 {titles.length ? titles.join(", ") : "No titles"}
          </p>

          <div className="team-meta">
            <p><span>Captain:</span> {info.captain || "N/A"}</p>
            <p><span>Coach:</span> {info.coach || "N/A"}</p>
            <p><span>Owner:</span> {info.owner || "N/A"}</p>
            <p><span>Home Venue:</span> {info.venue || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* ===== PLAYERS ===== */}
      <div className="players-section">
        <h2>Squad ({players.length})</h2>

        <div className="players-grid">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              <p className="player-name">{player.name}</p>
              <p className="player-role">
                {player.batting || "—"} | {player.bowling || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeamDetail;
