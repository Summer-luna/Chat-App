import styles from "../../assets/css/chatMessage.module.css";

export const Avatar = ({ avatarURL }) => {
  return (
    <div className={styles.Avatar}>
      <img src={avatarURL} alt="user avatar" />
    </div>
  );
};
