const currentLocation = async (lat, long) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${lat}%2C%20${long}`
  );
  if (res) {
    const data = await res.json();
    return data.ParentCity.Key;
  }
};

const currentName = async (lat, long) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=${lat}%2C%20${long}`
  );
  if (res) {
    const data = await res.json();
    return data.ParentCity.EnglishName;
  }
};

const currentWeahter = async (locationKey) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}`
  );
  if (res) {
    const data = await res.json();
    return data;
  }
};

const daileyForecast = async (locationKey) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
  );
  if (res) {
    const data = await res.json();
    return data;
  }
};

const autoComplete = async (location) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${location}`
  );
  if (res) {
    const data = await res.json();
    return data;
  }
};

const getCityInfo = async (location) => {
  const res = await fetch(
    `https://dataservice.accuweather.com/locations/v1/${location}?apikey=${process.env.REACT_APP_API_KEY}`
  );

  if (res) {
    const data = await res.json();
    return data.LocalizedName;
  }
};

export {
  currentLocation,
  currentWeahter,
  autoComplete,
  currentName,
  daileyForecast,
  getCityInfo,
};
