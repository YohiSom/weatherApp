import React, { useState, useEffect } from "react";
import "./favouritesMap.scss";
import "../../components/dailey/Dailey.scss";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import WeatherMap from "../weatherMap/WeatherMap";
import { iconObject } from "../../assets/IconObject";
import Dailey from "../dailey/Dailey";

function FavouritePage() {
  const { id, name } = useParams();

  const {
    newWeather,
    newDailey,
    city,
    locationKey,
    saveToLocal,
    setSaveToLocal,
  } = useAppContext();

  const [favouriteWeather, setFavouriteWeather] = useState([]);
  const [daileyWeather, setDaileyWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const favouriteLocation = async () => {
    const res = await newWeather(id);
    if (res) {
      setFavouriteWeather(res);
      setIsLoading(false);
    }
  };
  const daileyFavouriteLocation = async () => {
    const res = await newDailey(id);
    if (res) {
      setDaileyWeather(res);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    favouriteLocation();
    daileyFavouriteLocation();
  }, []);

  const weatherMap =
    !isLoading &&
    favouriteWeather?.map((item) => {
      return item.Temperature.Metric.Value;
    });
  const situation =
    !isLoading &&
    favouriteWeather?.map((item) => {
      return item.WeatherText;
    });

  const weatherId =
    !isLoading &&
    favouriteWeather?.map((item) => {
      return item.WeatherIcon;
    });

  if (
    isLoading &&
    favouriteWeather === undefined &&
    daileyWeather === undefined
  )
    return <h1>Loading...</h1>;

  //   console.log(weatherId);
  const elementId =
    !isLoading &&
    favouriteWeather &&
    iconObject.find((element) => element.id === weatherId[0]);
  //   console.log(elementId.text);
  //   const { text } = (elementId = {});

  if (elementId === undefined) return <h1>Loading...</h1>;

  const saveClick = () => {
    const favourites = {
      city: name,
      weatherMap: weatherMap,
      temp: situation,
      elementId: elementId.text,
      newLocationId: id,
      currentUserLoc: locationKey,
    };
    const copyNewArr = [...saveToLocal, favourites];
    setSaveToLocal(copyNewArr);
    localStorage.setItem("favourite", JSON.stringify(copyNewArr));
  };

  const unSave = () => {
    const deleteFromLocal = saveToLocal.filter(
      (element) => element.city !== name
    );
    setSaveToLocal(deleteFromLocal);
    localStorage.setItem("favourite", JSON.stringify(deleteFromLocal));
  };

  if (isLoading) return <h1>Loading...</h1>;

  const { DailyForecasts = [] } = daileyWeather || {};

  const date = (date) => {
    const newDate = date * 1000;
    const d = new Date(newDate);
    const time = d.toLocaleString("en-GB");
    return time;
  };

  const day = (d) => {
    const dayWeek = d * 1000;
    const date = new Date(dayWeek).getDay();
    return date;
  };

  return (
    <div className="favourites-container">
      <WeatherMap
        location={name}
        temp={weatherMap}
        situation={situation}
        imgSrc={require(`../../assets/icons/${elementId.text}.svg`)}
        onSave={saveClick}
        unSave={unSave}
        name={name}
      />
      <div className="dailey-container">
        {DailyForecasts.map((item) => {
          return (
            <div className="dailey-card" key={item.Date}>
              <Dailey
                day={day(item.EpochDate)}
                date={date(item.EpochDate)}
                icon={item.Day.Icon}
                temp={item.Temperature.Maximum.Value}
              />{" "}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}

export default FavouritePage;
