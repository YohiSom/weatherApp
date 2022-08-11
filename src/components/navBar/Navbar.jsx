import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

function Navbar({ name, temp }) {
  return (
    <div className="nav-container">
      <div className="welcome">{`${name} ${temp}°C`}</div>
      <div className="home-nav">
        <div className="home-favourite-container">
          {" "}
          <div className="home">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </div>
          <div className="favourites">
            {" "}
            <Link
              to="/favourites"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Favourites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
