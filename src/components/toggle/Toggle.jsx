import React from "react";
import "./Toggle.scss";
import { useAppContext } from "../../context/appContext";

function Toggle() {
  const { darkMode, setDarkMode } = useAppContext();

  const onToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark", JSON.stringify(!darkMode));
  };

  return (
    <div>
      <span className={darkMode && "dark-mode-span"}>LIGHT</span>
      <label className="switch">
        <input type="checkbox" defaultChecked={darkMode} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <span className={darkMode && "dark-mode-span"}>DARK</span>
    </div>
  );
}

export default Toggle;
