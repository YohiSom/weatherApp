import React, { useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { autoComplete } from "../../API/API";
import "./Search.scss";
import { useAppContext } from "../../context/appContext";
import { TbCurrentLocation } from "react-icons/tb";
import Toggle from "../toggle/Toggle";

function Search({ onCurrent }) {
  const [searchInput, setSearchInput] = useState(null);

  const { searchLocation, setSearchLocation, darkMode } = useAppContext();

  //   const onChange = (e) => {
  //     setSearchInput(e.target.value);
  //   };
  //   console.log(searchInput);

  return (
    <div className="select-container">
      <div className="toggle-card">
        <div className="toggle-container">
          <Toggle />
        </div>
      </div>
      <div className="select-search-container">
        <SelectSearch
          onChange={setSearchLocation}
          value={searchLocation}
          options={[]}
          printOptions={"on-focus"}
          defaultValue=""
          filterOptions={fuzzySearch}
          getOptions={(query) => {
            return new Promise((resolve, reject) => {
              if (query) {
                fetch(
                  `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${query}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    resolve(
                      data.map(({ LocalizedName, Key, Country }) => ({
                        value: Key,
                        name: `${LocalizedName},${Country.LocalizedName}`,
                      }))
                    );
                  })
                  .catch(reject);
              }
            });
          }}
          search
          placeholder="Search Location"
        />
        {/* <input onChange={(e) => setSearchInput(e.target.value)} />
      <select>Hallo</select> */}
        <div className="current-location-btn">
          <TbCurrentLocation
            size={30}
            onClick={onCurrent}
            title="click to go to current location"
            color={darkMode && "red"}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
