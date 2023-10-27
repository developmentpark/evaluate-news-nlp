import { getEl } from "../utils/domReader";

const switchTheme = (function () {
  let darkMode = false;
  return function () {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-theme");
    getEl("switch-theme").textContent = darkMode ? "Light" : "Dark";
  };
})();

getEl("switch-theme").addEventListener("click", switchTheme);
