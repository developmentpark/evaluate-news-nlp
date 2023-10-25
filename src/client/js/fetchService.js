async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { postData };
