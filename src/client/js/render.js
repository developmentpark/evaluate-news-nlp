import { getEl } from "../utils/domReader";
import { resultsView } from "./resultView";

function renderError(data) {
  console.log(data);
}

function renderAlert(message) {
  const alert = getEl("alert");
  alert.textContent = message.text;
  alert.classList.add(`alert_${message.type}`, "open");
  setTimeout(() => {
    alert.classList.remove("open");
  }, 4000);
}

function renderResults(data) {
  document.querySelector(".results-section").innerHTML = resultsView(data);
}

export { renderError, renderResults, renderAlert };
