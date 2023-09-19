import { resultsView } from "./resultView";

function handleSubmit(event) {
  event.preventDefault();
  let formText = document.querySelector(".input").value;
  checkForName(formText);
  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      document.querySelector(".results-section").innerHTML = resultsView(res);
    });
}

function onBlur(event) {
  // TODO
}

export { handleSubmit, onBlur };
