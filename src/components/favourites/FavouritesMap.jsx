import React from "react";
import { useAppContext } from "../../context/appContext";
import "./favouritesMap.scss";
import { findIconName } from "../../assets/IconObject";
import { Link } from "react-router-dom";

function FavouritesMap() {
  const { saveToLocal, darkMode } = useAppContext();
  return (
    <div className="favourites-container">
      <div className="favourite-card">
        {saveToLocal.map((item) => {
          return (
            <div className="favourite-map" key={item.city}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={
                  item.newLocationId
                    ? `/favourites/${item.newLocationId}/${item.city}`
                    : `/favourites/${item.currentUserLoc}/${item.city}`
                }
              >
                <div className={darkMode && "dark"}>{item.city}</div>
                <div
                  className={darkMode && "dark"}
                >{`${item.weatherMap}°C`}</div>
                <img
                  src={require(`../../assets/icons/${findIconName(
                    item.elementId
                  )}.svg`)}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavouritesMap;
