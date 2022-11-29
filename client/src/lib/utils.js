import dateFormat from "dateformat";

const scrollToButtom = (targetElement) => {
  targetElement.scrollIntoView({ behavior: "smooth" });
};

const formatDate = (date) => {
  const newDate = new Date(date);
  return dateFormat(newDate, "yyyy-mm-dd hh:mm");
};

export { scrollToButtom, formatDate };
