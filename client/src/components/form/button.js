import styles from "../../assets/css/button.module.css";

export const Button = ({
  name,
  type,
  width,
  height,
  bg,
  color,
  border,
  clickHandler,
  custom,
  disabled,
}) => {
  let buttonStyle = {
    width: width + "%",
    height: height + "px",
    backgroundColor: bg,
    color: color,
    border: border,
    ...custom,
  };
  //console.log(disabled);
  return (
    <button
      type={type}
      style={buttonStyle}
      className={styles.Button}
      onClick={clickHandler}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
