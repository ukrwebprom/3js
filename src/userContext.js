import { createContext, useContext, useState, useEffect } from "react";
import { GoogleSignIn, GoogleSignOut } from "./firebase_setup/firebase";
/* import { useAuthState } from "react-firebase-hooks/auth"; */


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
/*   const [user] = useAuthState(auth); */
  const [user, setUser] = useState(null);
  const [chatname, setChatname] = useState(() => localStorage.getItem("chatname"));
  const [chatID, setChatID] = useState(() => "main");


  useEffect(() => {
    if (chatname) localStorage.setItem("chatname", chatname);
  }, [chatname]);

  useEffect(() => {
    if(!chatname && user) setChatname(user.displayName);
    if(user) console.log(user.displayName);
  }, [user, chatname]);

  const logIn = async () => {
    const user = await GoogleSignIn();
    setUser(user);
  };
  const logOut = () => {
    GoogleSignOut();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, logIn, logOut, chatname, setChatname, chatID, setChatID }}>
      {children}
    </UserContext.Provider>
  );
};
