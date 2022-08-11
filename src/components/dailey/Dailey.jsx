import React from "react";
import "./Dailey.scss";
import { iconObject } from "../../assets/IconObject";
import { useAppContext } from "../../context/appContext";

function Dailey({ date, icon, temp, day }) {
  const newDate = date.split(",");
  const { darkMode } = useAppContext();
  const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const elementId = iconObject.find((element) => element.id === icon);

  return (
    <div>
      <div className="dailey-day-card">
        <div className={!darkMode ? "day" : "day-dark"}>{daysArray[day]}</div>
      </div>
      <div className={!darkMode ? "dailey-day-card" : "dailey-day-card-dark"}>
        <div>{newDate[0]}</div>
      </div>
      <div className="dailey-day-card">
        <img src={require(`../../assets/icons/${elementId.text}.svg`)} />
      </div>
      <div className="dailey-day-card">
        {" "}
        <div className={darkMode && "temp-dailey-dark"}>{temp}°C</div>
      </div>
    </div>
  );
}

export default Dailey;
