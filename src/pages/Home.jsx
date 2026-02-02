import { useNavigate } from "react-router-dom";
import statsMap from "../constants/statsMap";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-stats">
      <h2 className="home-title">IPL STATISTICS</h2>

      <div className="stats-grid">
        {statsMap.map((stat) => (
          <div
            key={stat.key}
            className="stat-card"
            onClick={() => navigate(`/stats/${stat.key}`)}
          >
            {stat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
