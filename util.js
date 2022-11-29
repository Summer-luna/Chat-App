const convertBufferToBase64 = (buffer) => {
  // convert Buffer to base64 for img src
  return "data:image/png;base64, " + buffer.toString("base64");
};

module.exports = {
  convertBufferToBase64: convertBufferToBase64,
};
