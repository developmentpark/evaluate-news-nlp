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
    .then((res) => {
      if (!res.ok) {
        throw new Error({ status: res.status });
      }
      return res.json();
    })
    .then((data) => renderResults(data))
    .catch((error) => renderAlert(messages.NETWORK_ERROR));
}

export { handleSubmit };
