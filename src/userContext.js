import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [chatname, setChatname] = useState(() => localStorage.getItem("chatname"));
  const [chatID, setChatID] = useState(() => "main");

/*   useEffect(() => {
    setChatname(localStorage.getItem("chatname"));
  }, []); */

  useEffect(() => {
    if (chatname) localStorage.setItem("chatname", chatname);
  }, [chatname]);

  useEffect(() => {
    if(!chatname && user) setChatname(user.displayName);
    if(user) console.log(user.displayName);
  }, [user, chatname]);

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const logOut = () => {
    auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{ user, logIn, logOut, chatname, setChatname, chatID, setChatID }}>
      {children}
    </UserContext.Provider>
  );
};
