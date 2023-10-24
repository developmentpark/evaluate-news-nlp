import { resultsView } from "./resultView";

function renderError(data) {
  console.log(data);
}

function renderResults(data) {
  document.querySelector(".results-section").innerHTML = resultsView(data);
}

function renderLoadingIndicator(enable = true) {
  document.querySelector(".results-section").innerHTML = enable
    ? "<div class='spinner'></div>"
    : "";
}

export { renderError, renderResults, renderLoadingIndicator };
