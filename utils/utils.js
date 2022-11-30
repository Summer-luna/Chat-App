const dateFormat = require("date-format");

const formatDate = (date) => {
  const newDate = new Date(date);
  return dateFormat("yyyy-MM-dd hh:mm", newDate);
};

module.exports = {
  formatDate: formatDate,
};
