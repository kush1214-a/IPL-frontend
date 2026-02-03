import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/TeamDetail.css";

/* ================= STATIC TEAM DATA ================= */

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
  RCB: [],
  DC: [],
  PBKS: [],
  LSG: []
};

/* ================= COMPONENT ================= */

export default function TeamDetail() {
  const { teamCode } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    api.get(`/teams/${teamCode}`).then(res => setTeam(res.data));
  }, [teamCode]);

  if (!team) return <div className="team-loading">Loading...</div>;

  const info = TEAM_INFO[teamCode] || {};
  const titles = TEAM_TITLES[teamCode] || [];

  return (
    <div
      className="team-detail-page"
      style={{ backgroundImage: "url(/bg/ipl.jpg)" }}
    >
      {/* ===== HEADER ===== */}
      <div className="team-banner">
        <img src={team.logo} alt={team.name} />
        <div>
          <h1>{team.name}</h1>
          <p className="titles">
            🏆 {titles.length ? titles.join(", ") : "No Titles"}
          </p>
        </div>
      </div>

      {/* ===== META ===== */}
      <div className="team-meta">
        <p><span>Captain:</span> {info.captain}</p>
        <p><span>Coach:</span> {info.coach}</p>
        <p><span>Owner:</span> {info.owner}</p>
        <p><span>Venue:</span> {info.venue}</p>
      </div>

      {/* ===== SQUAD ===== */}
      <h2 className="squad-title">Squad ({team.players.length})</h2>

      <div className="squad-grid">
        {team.players.map(player => (
          <div className="player-card" key={player.id}>
            <h4>{player.name}</h4>
            <p>{player.batting} | {player.bowling}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
