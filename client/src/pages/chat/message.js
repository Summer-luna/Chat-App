import styles from "../../assets/css/chatMessage.module.css";
import { useEffect, useRef } from "react";
import { scrollToButtom } from "../../lib/utils";
import { Avatar } from "../../components/ui/avatar.styled";

export const Message = ({ message, left }) => {
  const ref = useRef();

  // scroll to new message
  useEffect(() => {
    scrollToButtom(ref.current);
  }, [message]);

  // change message to left side
  const style = {
    justifyContent: "start",
    flexDirection: "row-reverse",
    marginLeft: "1rem",
  };

  return (
    <div className={styles.MessageContainer} ref={ref} style={left && style}>
      <div className={styles.TextContainer}>
        <small>{message.user_display_name}</small>
        <div className={styles.Text}>{message.message_content}</div>
        <small>{message.message_date}</small>
      </div>
      <Avatar avatarURL={message.user_avatar_url} />
    </div>
  );
};
