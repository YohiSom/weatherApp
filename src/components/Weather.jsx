import React, { useState, useEffect } from "react";
import Navbar from "../components/navBar/Navbar";
import WeatherMap from "./weatherMap/WeatherMap";
import { iconObject } from "../assets/IconObject";
import Dailey from "./dailey/Dailey";
import "./dailey/Dailey.scss";
import Search from "./search/Search";
import { useAppContext } from "../context/appContext";

function Weather() {
  const {
    searchLocation,
    newWeather,
    newDailey,
    newCity,
    lat,
    long,
    weather,
    setWeather,
    locationKey,
    dailey,
    city,
    coords,
    loading,
    setDailey,
    setCity,
    setLoading,
    saveToLocal,
    setSaveToLocal,
    onClickFavourite,
    setOnclickFavourite,
  } = useAppContext();

  //   const [lat, setLat] = useState("");
  //   const [long, setLong] = useState("");
  //   const [weather, setWeather] = useState([]);
  //   const [locationKey, setLocationKey] = useState("");
  //   const [dailey, setDailey] = useState({});
  //   const [city, setCity] = useState("");

  // const [newCityName, setNewCityName] = useState("");
  const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(true);
  const [newLocationId, setNewLocationId] = useState(null);
  const [currentState, setCurrentState] = useState(false);

  const updateWeather = async () => {
    if (newLocationId) {
      const weatherNow = await newWeather(newLocationId).catch((err) =>
        setError("Oops, something went wrong")
      );

      weatherNow && setWeather(weatherNow);

      const daileyWeather = await newDailey(newLocationId).catch((err) =>
        setError("Oops, something went wrong")
      );

      daileyWeather && setDailey(daileyWeather);

      const newNameCity = await newCity(newLocationId).catch((err) =>
        setError("Oops, something went wrong")
      );
      newNameCity && setCity(newNameCity);

      setLoading(false);
    }
  };

  useEffect(() => {
    setNewLocationId(searchLocation);
  }, [searchLocation]);

  //   useEffect(() => {

  //   }, [onClickFavourite]);

  useEffect(() => {
    if (newLocationId) {
      updateWeather();
    }
  }, [newLocationId]);

  useEffect(() => {
    coords();
    setNewLocationId(null);
  }, [lat, long, locationKey, currentState]);

  if (loading || dailey === undefined) return <h1>Loading...</h1>;

  if (loading || locationKey === undefined) return <h1>Loading...</h1>;

  //   if (error) return <h1>{error}</h1>;

  if (loading || weather === undefined) return <h1>Loading...</h1>;

  if (loading || city === undefined) return <h1>Loading...</h1>;

  const weatherMap = weather?.map((item) => {
    return item.Temperature.Metric.Value;
  });

  const situation = weather?.map((item) => {
    return item.WeatherText;
  });

  const weatherId = weather?.map((item) => {
    return item.WeatherIcon;
  });
  const elementId = iconObject.find((element) => element.id === weatherId[0]);
  if (loading || elementId === undefined) return <h1>Loading...</h1>;

  const { DailyForecasts = [] } = dailey || {};

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

  const saveClick = () => {
    const favourites = {
      city: city,
      weatherMap: weatherMap,
      temp: situation,
      elementId: elementId.text,
      newLocationId: newLocationId,
      currentUserLoc: locationKey,
    };
    const copyNewArr = [...saveToLocal, favourites];
    setSaveToLocal(copyNewArr);
    localStorage.setItem("favourite", JSON.stringify(copyNewArr));
  };

  const unSave = () => {
    const deleteFromLocal = saveToLocal.filter(
      (element) => element.city !== city
    );
    setSaveToLocal(deleteFromLocal);
    localStorage.setItem("favourite", JSON.stringify(deleteFromLocal));
  };

  const onCurrent = () => {
    setCurrentState(!currentState);
  };

  return (
    <div>
      <Search onCurrent={onCurrent} />
      <WeatherMap
        location={city}
        temp={weatherMap}
        situation={situation}
        imgSrc={require(`../assets/icons/${elementId.text}.svg`)}
        onSave={saveClick}
        unSave={unSave}
        name={city}
      />

      <div className="dailey-container">
        {DailyForecasts.map((item) => {
          return (
            <div className="dailey-card" key={item.Date}>
              {" "}
              <Dailey
                day={day(item.EpochDate)}
                date={date(item.EpochDate)}
                icon={item.Day.Icon}
                temp={item.Temperature.Maximum.Value}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
