import { checkForName } from "./nameChecker";

function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.querySelector(".input").value;
  checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      document.querySelector(".results-section").innerHTML = res.sentence_list
        .map((s) => s.text)
        .join("<br>");
    });
}

function onBlur(event) {
  // TODO
}

export { handleSubmit, onBlur };
