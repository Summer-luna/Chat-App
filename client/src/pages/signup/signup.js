import DefaultAvatar from "../../assets/avatar/defaultAvatar.png";
import styles from "../../assets/css/login.module.css";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/button";
import { useEffect, useState } from "react";
import { Message } from "../../components/ui/message";
import { Form, Link, useActionData, redirect } from "react-router-dom";
import { signup } from "../../lib/api";

export const Signup = () => {
  const [avatar, setAvatar] = useState(DefaultAvatar);
  const [message, setMessage] = useState(null);
  const formData = useActionData();

  useEffect(() => {
    if (formData) {
      setMessage(formData);
    }
  }, [formData]);

  const uploadAvatar = (e) => {
    const file = e.target.files[0];

    // if user cancel the upload behavior
    if (!file) {
      return;
    }

    // check if upload image
    if (file.type.split("/")[0] !== "image") {
      setMessage("Please uploads image.");
      return;
    }

    setAvatar(URL.createObjectURL(file));
    setMessage(null);
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.ErrorContainer}>
        {message && <Message message={message} />}
      </div>
      <Form
        className={styles.LoginCard}
        method="post"
        action="/signup"
        encType="multipart/form-data"
      >
        <div className={styles.AvatarContainer}>
          <Input
            type="file"
            changeHandler={uploadAvatar}
            className={styles.FileInput}
            name="avatar"
          />
          <img src={avatar} alt="default avatar"></img>
        </div>
        <div className={styles.InputsContainer}>
          <Input
            type="text"
            height={35}
            width={80}
            placeholder="Your Display Name"
            name="displayName"
            defaultValue="Mike"
          />
          <Input
            type="email"
            height={35}
            width={80}
            placeholder="Your Email"
            name="email"
            defaultValue="test@test.com"
          />
          <Input
            type="password"
            height={35}
            width={80}
            placeholder="Your Password"
            name="password"
            defaultValue="test"
          />
        </div>
        <div className={styles.ButtonContainer}>
          <Button name="SIGNUP" width={80} height={35} bg="#fe5f55" />
          <Link to="/login">
            <Button
              name="LOGIN"
              width={80}
              height={35}
              bg="white"
              color="grey"
              border="1px solid black"
            />
          </Link>
        </div>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());

  const res = await signup(data);
  return res.data;
}
