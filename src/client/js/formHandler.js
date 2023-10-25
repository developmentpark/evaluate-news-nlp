import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderResults, renderAlert, renderLoadingIndicator } from "./render";
import { messages } from "./messages";

const apiUrl = process.env.API_URL || "http://localhost:8080/test";

function handleSubmit(event) {
  event.preventDefault();
  let receivedUrl = getEl("input").value;
  if (!isFormatUrlValid(receivedUrl)) {
    renderAlert(messages.INVALID_INPUT);
    return;
  }
  renderLoadingIndicator();
  postData(apiUrl, { url: receivedUrl })
    .then((res) => {
      if (!res.ok) {
        const error = new Error();
        error.status = res.status;
        throw error;
      }
      return res.json();
    })
    .then((data) => {
      renderLoadingIndicator(false);
      renderResults(data);
      renderAlert(messages.SUCCESS);
    })
    .catch((error) => {
      renderLoadingIndicator(false);
      error.status == 500
        ? renderAlert(messages.SERVER_ERROR)
        : renderAlert(messages.NETWORK_ERROR);
    });
}

export { handleSubmit };
