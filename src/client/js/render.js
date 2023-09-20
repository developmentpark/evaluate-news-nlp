import { resultsView } from "./resultView";

function renderError(data) {
  console.log(data);
}

function renderResults(data) {
  document.querySelector(".results-section").innerHTML = resultsView(data);
}

export { renderError, renderResults };
