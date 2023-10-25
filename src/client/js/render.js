import { getEl } from "../utils/domReader";
import { resultsView } from "./resultView";

const renderAlert = (function () {
  let timer;
  const timeout = 4000;
  return function (message) {
    const alert = getEl("alert");
    if (alert.classList.contains("open")) {
      alert.classList.remove("open");
      clearTimeout(timer);
    }
    alert.classList.remove("alert_success", "alert_danger");
    alert.textContent = message.text;
    alert.classList.add(`alert_${message.type}`, "open");
    timer = setTimeout(() => {
      alert.classList.remove("open");
    }, timeout);
  };
})();

function renderResults(data) {
  document.querySelector(".results-section").innerHTML = resultsView(data);
}

export { renderResults, renderAlert };
