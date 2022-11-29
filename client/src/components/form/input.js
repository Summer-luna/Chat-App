import styles from "../../assets/css/input.module.css";

export const Input = ({
  type,
  width,
  height,
  placeholder,
  changeHandler,
  className,
  name,
  custom,
  defaultValue,
  value,
  disabled,
}) => {
  const inputStyle = {
    width: width + "%",
    height: height + "px",
    ...custom,
  };

  return (
    <div className={`${styles.InputContainer} `}>
      <input
        type={type}
        name={name}
        style={inputStyle}
        placeholder={placeholder}
        onChange={changeHandler}
        className={className}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};
