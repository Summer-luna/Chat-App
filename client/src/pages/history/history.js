import { getCurrentUserMessages } from "../../lib/api";
import { Message } from "../chat/message";
import { useLoaderData } from "react-router-dom";
import styles from "../../assets/css/chat.module.css";

export const History = () => {
  const loaderData = useLoaderData();

  const renderContent =
    loaderData &&
    loaderData.map((chat) => {
      return <Message message={chat} key={chat.message_id} />;
    });

  return (
    <div className={styles.ChatContainer}>
      <h1>History</h1>
      <div className={styles.MessageContainer}>{renderContent}</div>
    </div>
  );
};

export async function loader() {
  const res = await getCurrentUserMessages();

  return res.data;
}
