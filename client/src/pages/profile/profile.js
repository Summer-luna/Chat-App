import { useUserContext } from "../../context/userContext";
import { Button } from "../../components/form/button";
import styles from "../../assets/css/profile.module.css";
import { Input } from "../../components/form/input";
import { checkCredential, deleteUser, logout, updateUser } from "../../lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, setUser } = useUserContext();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const fileChangeHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const displayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const submitHandler = async () => {
    const formData = {
      displayName: displayName,
      avatar: avatar,
    };

    const res = await updateUser(formData);
    const data = await checkCredential();
    if (data.data.loggedIn) {
      setUser({
        ...data.data.user,
      });
    }
  };

  const clickHandler = async () => {
    await deleteUser();
    const data = await logout();
    if (!data.data.loggedIn) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className={styles.ProfileContainer}>
      <h1>Profile</h1>
      <form className={styles.FormContainer}>
        <div className={styles.AvatarContainer}>
          <Input
            type="file"
            name="avatar"
            className={styles.FileInput}
            changeHandler={fileChangeHandler}
          />
          <img
            src={user.avatar ? user.avatar : "https://i.imgur.com/WTIETJ1.png"}
            alt="default avatar"
          ></img>
        </div>
        {!displayName && <small>Please enter display name.</small>}
        <Input
          defaultValue={user.displayName}
          width={100}
          name="displayName"
          changeHandler={displayNameChange}
        />
        <Input defaultValue={user.email} width={100} disabled={true} />
        <Button
          type="button"
          name="Update"
          width="100"
          height="50"
          bg="#fe5f55"
          clickHandler={submitHandler}
        />
        <Button
          type="button"
          name="Delete"
          width="100"
          height="50"
          bg="#fe5f55"
          clickHandler={clickHandler}
        />
      </form>
    </div>
  );
};
