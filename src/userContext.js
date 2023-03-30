import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase_setup/firebase";
import { GoogleSignIn } from "./firebase_setup/firebase";
/* import { useAuthState } from "react-firebase-hooks/auth"; */
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
/*   const [user] = useAuthState(auth); */
  const [user, setUser] = useState(null);
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

  const logIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    const user = await GoogleSignIn();
    setUser(user);
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
