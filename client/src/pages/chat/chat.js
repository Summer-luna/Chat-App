import styles from "../../assets/css/chat.module.css";
import { useUserContext } from "../../context/userContext";
import { useEffect, useState } from "react";
import { Message } from "./message";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/button";
import { io } from "socket.io-client";
import { useLoaderData } from "react-router-dom";
import { getAllMessages } from "../../lib/api";
const socket = io.connect("https://chat-app-full.onrender.com/chat");

export const Chat = () => {
  const { user } = useUserContext();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(null);
  const messages = useLoaderData();

  useEffect(() => {
    setChats(messages);
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      const res = await getAllMessages();
      setChats(res.data);
    });
  }, [socket]);

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    socket.emit("sendMessage", { user: user, message: message });
    setMessage("");
    const res = await getAllMessages();
    setChats(res.data);
  };

  console.log(chats);
  const renderContent =
    chats &&
    chats.map((chat) => {
      if (chat.user_id === user.id) {
        return <Message message={chat} key={chat.message_id} />;
      }
      return <Message message={chat} key={chat.message_id} left="left" />;
    });

  return (
    <div className={styles.ChatContainer}>
      <h1>Start Chat</h1>
      <div className={styles.MessageContainer}>{renderContent}</div>
      <div className={styles.SendContainer}>
        <div className={styles.Inputs}>
          <Input
            type="text"
            height="50"
            width="100"
            custom={{ overflowWrap: "break-word" }}
            changeHandler={changeHandler}
            value={message}
          />
          <Button
            bg="#16db65"
            width="100%"
            height="50"
            name="Send"
            custom={{ padding: "0 10px", marginLeft: "10px" }}
            clickHandler={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export async function loader() {
  const res = await getAllMessages();
  return res.data;
}
