import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderResults, renderError } from "./render";

const apiUrl = process.env.API_URL || "http://localhost:8080/test";

function handleSubmit(event) {
  event.preventDefault();
  let receivedUrl = getEl("input").value;
  if (!isFormatUrlValid(receivedUrl)) {
    renderError({ message: "Invalid format for URL." });
    return;
  }
  postData(apiUrl, { url: receivedUrl })
    .then((res) => renderResults(res))
    .catch((error) => renderError({ message: error.message }));
}

export { handleSubmit };
