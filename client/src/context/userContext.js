import { createContext, useContext, useEffect, useState } from "react";
import { checkCredential } from "../lib/api";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkCredential().then((r) => {
      if (r.data.loggedIn) {
        setUser({
          ...r.data.user,
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
