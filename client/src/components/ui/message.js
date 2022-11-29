import styles from "../../assets/css/message.module.css";
export const Message = ({ message }) => {
  return <div className={styles.Message}>{message}</div>;
};
