import DefaultAvatar from "../../assets/avatar/defaultAvatar.png";
import styles from "../../assets/css/login.module.css";
import { Input } from "../../components/form/input";
import { Button } from "../../components/form/button";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Message } from "../../components/ui/message";
import { login } from "../../lib/api";

export const Login = () => {
  const { setUser } = useUserContext();
  const action = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof action === "object") {
      setUser(action);
      navigate("/chat");
    }
  }, [action]);

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.ErrorContainer}>
        {typeof action === "string" && <Message message={action} />}
      </div>
      <Form
        className={styles.LoginCard}
        method="post"
        action="/login"
        encType="multipart/form-data"
      >
        <div className={styles.AvatarContainer}>
          <img src={DefaultAvatar} alt="default avatar"></img>
        </div>
        <div className={styles.InputsContainer}>
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
          <Button name="LOGIN" width={80} height={35} bg="#fe5f55" />
          <Link to="/signup">
            <Button
              name="SIGNUP"
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
  const res = await login(data);

  return res.data;
}
