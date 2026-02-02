import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="ipl-navbar">
      {/* LEFT: LOGO */}
      <div className="ipl-navbar-left">
        <img
          src="/bg/ipl.png"
          alt="IPL Logo"
          className="ipl-logo-img"
        />
      </div>

      {/* RIGHT: MENU */}
      <nav className="ipl-navbar-right">
        <NavLink to="/" className="ipl-link">
          HOME
        </NavLink>
        <NavLink to="/teams" className="ipl-link">
          TEAMS
        </NavLink>
        <NavLink to="/players" className="ipl-link">
          PLAYERS
        </NavLink>
        <NavLink to="/compare" className="ipl-link">
          COMPARE
        </NavLink>
        <NavLink to="/charts" className="ipl-link">
          CHARTS
        </NavLink>
      </nav>
    </header>
  );
}
