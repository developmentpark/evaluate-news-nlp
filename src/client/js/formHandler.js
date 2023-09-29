import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderResults, renderAlert } from "./render";
import { messages } from "./messages";

const apiUrl = process.env.API_URL || "http://localhost:8080/test";

function handleSubmit(event) {
  event.preventDefault();
  let receivedUrl = getEl("input").value;
  if (!isFormatUrlValid(receivedUrl)) {
    renderAlert(messages.INVALID_INPUT);
    return;
  }
  postData(apiUrl, { url: receivedUrl })
    .then((data) => data.json())
    .then((res) => renderResults(res))
    .catch((error) => renderAlert(messages.NETWORK_ERROR));
}

export { handleSubmit };
