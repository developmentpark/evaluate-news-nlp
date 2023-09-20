function isFormatUrlValid(url) {
  const urlPattern = /^(http|https):\/\/(.*)/;
  return urlPattern.test(url);
}

export { isFormatUrlValid };
