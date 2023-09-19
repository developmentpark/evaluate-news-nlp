import { resultsView } from "./resultView";

function renderResults(data) {
  document.querySelector(".results-section").innerHTML = resultsView(data);
}

export { renderResults };
