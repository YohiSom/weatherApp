import Weather from "./components/Weather";
import "./App.css";
import Navbar from "./components/navBar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { useAppContext } from "./context/appContext";
import FavouriteWeather from "./pages/FavouriteWeather";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { weatherMap, city, error, darkMode, theme } = useAppContext();

  darkMode
    ? (document.body.style.backgroundColor = "#002B5B")
    : (document.body.style.backgroundColor = "#FFFFFF");

  return (
    <div>
      {" "}
      <Router>
        {error && <ErrorPage />}
        {!error && (
          <>
            <Navbar name={city} temp={weatherMap} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />}></Route>
              <Route
                path="/favourites/:id/:name"
                element={<FavouriteWeather />}
              />{" "}
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
