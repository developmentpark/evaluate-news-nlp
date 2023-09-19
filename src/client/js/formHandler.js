import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderResults } from "./render";

function handleSubmit(event) {
  event.preventDefault();
  let formText = getEl("input").value;
  if (!isFormatUrlValid(formText)) {
    return;
  }
  checkForName(formText);
  console.log("::: Form Submitted :::");
  postData("http://localhost:8080/test")
    .then((res) => res.json())
    .then(function (res) {
      renderResults(res);
    });
}

function onBlur(event) {
  // TODO
}

export { handleSubmit, onBlur };
