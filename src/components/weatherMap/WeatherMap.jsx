import React, { useState } from "react";
import "./WeatherMap.scss";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useAppContext } from "../../context/appContext";

function WeatherMap({
  location,
  temp,
  imgSrc,
  situation,
  onSave,
  unSave,
  name,
}) {
  const { saveToLocal, city, darkMode } = useAppContext();

  const isFavourite = saveToLocal.map((item) => {
    return item.city;
  });

  const doesCityExist = isFavourite.includes(name);

  return (
    <div className="container-weather-card">
      <div className="container-current-city">
        <div className="city-container">
          <div className={!darkMode ? "city-font" : "city-font-dark"}>
            {location}
          </div>
          <div className="heart-button">
            {doesCityExist && (
              <BsFillSuitHeartFill
                size={30}
                onClick={unSave}
                title="Click to unsave to favourites"
                className="hearts"
                fill="red"
              />
            )}
            {!doesCityExist && (
              <BsSuitHeart
                size={30}
                onClick={onSave}
                title="Click to save to favourites"
                className="hearts"
                fill="red"
              />
            )}
          </div>{" "}
        </div>

        <div className={!darkMode ? "temp-font" : "temp-font-dark"}>
          {" "}
          {temp}°C
        </div>
        <img className="svg" src={imgSrc} />
        {/* <div>{situation}</div> */}
      </div>
    </div>
  );
}

export default WeatherMap;
