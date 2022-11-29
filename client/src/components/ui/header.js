import styles from "../../assets/css/header.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import DefaultAvatar from "../../assets/avatar/defaultAvatar.png";
import { logout } from "../../lib/api";

export const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState({
    chat: false,
    history: false,
    login: false,
  });
  const location = useLocation();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  // change NavLink style when navigating
  useEffect(() => {
    switch (location.pathname) {
      case "/chat":
        setActiveLink({
          chat: true,
          history: false,
          login: false,
          profile: false,
        });
        break;
      case "/history":
        setActiveLink({
          chat: false,
          history: true,
          login: false,
          profile: false,
        });
        break;
      case "/login":
        setActiveLink({
          chat: false,
          history: false,
          login: true,
          profile: false,
        });
        break;
      case "/profile":
        setActiveLink({
          chat: false,
          history: false,
          login: false,
          profile: true,
        });
        break;
    }
  }, [location.pathname]);

  // trigger active NavContainer
  const activeToggler = () => {
    setToggle((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    const data = await logout();
    if (!data.data.loggedIn) {
      setUser(null);
      navigate("/login");
      setToggle(false);
    }
  };

  return (
    <header>
      <Link to="/chat" className={styles.BrandLink}>
        <h3 className={styles.Brand}>CHAT APP</h3>
      </Link>
      <div
        className={`${styles.NavContainer} ${toggle && styles.ActiveToggler}`}
      >
        <Link
          to="/chat"
          className={`${styles.NavLink} ${
            activeLink.chat && styles.NavLinkActive
          }`}
          onClick={activeToggler}
        >
          <li>Chat</li>
        </Link>

        <Link
          to="/history"
          className={`${styles.NavLink} ${
            activeLink.history && styles.NavLinkActive
          }`}
          onClick={activeToggler}
        >
          <li>History</li>
        </Link>
        {user && (
          <Link
            to="/profile"
            className={`${styles.AvatarBtn} ${styles.NavLink}`}
          >
            <li>
              <img
                src={user.avatar ? user.avatar : DefaultAvatar}
                alt="default avatar"
              ></img>
            </li>
          </Link>
        )}
        {user && (
          <Link
            to="/profile"
            className={`${styles.NavLink} ${styles.ProfileLink} ${
              activeLink.profile && styles.NavLinkActive
            }`}
            onClick={activeToggler}
          >
            <li>Profile</li>
          </Link>
        )}
        {user ? (
          <div
            className={`${styles.LogoutBtn} ${styles.NavLink}`}
            onClick={logoutHandler}
          >
            <li>Logout</li>
          </div>
        ) : (
          <Link
            to="/login"
            className={`${styles.NavLink} ${
              activeLink.login && styles.NavLinkActive
            }`}
            onClick={activeToggler}
          >
            <li>Login</li>
          </Link>
        )}
      </div>
      <div
        className={`${styles.NavBarToggler} ${toggle && styles.ActiveToggler}`}
        onClick={activeToggler}
      >
        <div className={styles.Line1}></div>
        <div className={styles.Line2}></div>
        <div className={styles.Line3}></div>
      </div>
    </header>
  );
};
