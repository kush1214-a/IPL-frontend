import "../styles/Compare.css";

export default function Compare() {
  return (
    <div className="compare-page">
      <h2>HEAD TO HEAD</h2>

      <div className="compare-cards">
        <div className="compare-team">
          <img src="/teams/csk.png" />
          <p>Chennai Super Kings</p>
        </div>

        <span className="vs">VS</span>

        <div className="compare-team">
          <img src="/teams/dc.png" />
          <p>Delhi Capitals</p>
        </div>
      </div>

      <div className="compare-stats">
        <div><span>Played</span><b>25</b><b>27</b></div>
        <div><span>Won</span><b>14</b><b>12</b></div>
        <div><span>Highest Score</span><b>246</b><b>257</b></div>
      </div>
    </div>
  );
}
