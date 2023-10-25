const messages = {
  SUCCESS: {
    text: "Analysis completed successfully!",
    type: "success",
  },
  INVALID_INPUT: {
    text: "Invalid format for URL.",
    type: "danger",
  },
  NETWORK_ERROR: {
    text: "Sorry, we were unable to complete your request at this time. Please try again later.",
    type: "danger",
  },
  SERVER_ERROR: {
    text: "We're sorry, something went wrong on our server. Please try again later.",
    type: "danger",
  },
};

export { messages };
