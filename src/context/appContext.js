import React, { useContext, useState, useEffect } from "react";
import {
  currentWeahter,
  daileyForecast,
  getCityInfo,
  currentLocation,
  currentName,
} from "../API/API";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const favourite = JSON.parse(localStorage.getItem("favourite")) || [];
  const isDark = JSON.parse(localStorage.getItem("dark")) || false;

  const [searchLocation, setSearchLocation] = useState(null);
  const [saveToLocal, setSaveToLocal] = useState(favourite);
  const [onClickFavourite, setOnclickFavourite] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weather, setWeather] = useState([]);
  const [locationKey, setLocationKey] = useState("");
  const [dailey, setDailey] = useState({});
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [darkMode, setDarkMode] = useState(isDark);

  const themes = {
    dark: { backgroundColor: "black", color: "white" },
    light: {
      backgroundColor: "white",
      color: "black",
    },
  };

  // const theme = darkMode ? themes.dark : themes.light;

  const newWeather = async (location) => {
    const res = await currentWeahter(location).catch((err) => setError(true));
    return res;
  };

  const newDailey = async (location) => {
    const res = await daileyForecast(location).catch((err) => setError(true));

    return res;
  };

  const newCity = async (location) => {
    const res = await getCityInfo(location).catch((err) => setError(true));
    return res;
  };

  const coords = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    if (lat && long) {
      const newKey = await currentLocation(lat, long).catch((err) =>
        setError(true)
      );

      const cityName = await currentName(lat, long).catch((err) =>
        setError(true)
      );
      newKey && setLocationKey(newKey);
      cityName && setCity(cityName);
    }

    if (locationKey) {
      const weatherNow = await currentWeahter(locationKey).catch((err) =>
        setError(true)
      );
      setWeather(weatherNow);
    }
    if (locationKey) {
      const daileyWeather = await daileyForecast(locationKey).catch((err) =>
        setError(true)
      );
      setDailey(daileyWeather);
    }

    setLoading(false);
  };

  const weatherMap = weather?.map((item) => {
    return item.Temperature.Metric.Value;
  });

  return (
    <AppContext.Provider
      value={{
        searchLocation,
        setSearchLocation,
        newWeather,
        newDailey,
        newCity,
        onClickFavourite,
        lat,
        long,
        weather,
        locationKey,
        dailey,
        city,
        coords,
        loading,
        setWeather,
        setDailey,
        setCity,
        setLoading,
        saveToLocal,
        setSaveToLocal,
        setOnclickFavourite,
        weatherMap,
        error,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
