import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderResults, renderError, renderLoadingIndicator } from "./render";

const apiUrl = process.env.API_URL || "http://localhost:8080/test";

function handleSubmit(event) {
  event.preventDefault();
  let receivedUrl = getEl("input").value;
  if (!isFormatUrlValid(receivedUrl)) {
    renderError({ message: "Invalid format for URL." });
    return;
  }
  renderLoadingIndicator();
  postData(apiUrl, { url: receivedUrl })
    .then((res) => {
      renderLoadingIndicator(false);
      renderResults(res);
    })
    .catch((error) => {
      renderLoadingIndicator(false);
      renderError({ message: error.message });
    });
}

export { handleSubmit };
