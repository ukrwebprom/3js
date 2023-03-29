import "./sendmessage.scss";
import ContentEditable from "react-contenteditable";
import { useState } from "react";
import { useRef } from "react";
import { useUser } from "../../userContext";
import { db } from "../../firebase_setup/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FcGoogle } from 'react-icons/fc';
import { BiMessageError } from 'react-icons/bi';
import { RiSendPlaneLine } from 'react-icons/ri';

const MessageTypes = {
  NORMAL: "Say normally",
  WHISPER: "Whisper",
  ALOUD: "Aloud",
  SCREAM: "Scream",
  CRY: "Hysterical cry"
};

export const SendMessage = () => {
  const { user, logIn, chatID } = useUser();
  const text = useRef("");
  const [isWritten, setIsWritten] = useState(false);
  const [messageType, setMessageType] = useState('NORMAL');

  const handleChange = (evt) => {
    text.current = evt.target.value;
    setIsWritten(text.current !== "");
  };
  const handleBlur = () => {
    console.dir(text.current);
  };

  const Send = async () => {
    const { uid, displayName, photoURL } = user;
    await addDoc(collection(db, "messages"), {
      text: text.current,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      chatID,
      messageType,
      uid,
    });
    text.current = "";
  };

  return (
    <div className="send-container">
      {user ? (
        <>
          <ContentEditable
            html={text.current}
            onBlur={handleBlur}
            onChange={handleChange}
            className="typearea"
          />

            <div className="send-form">
            <form>
            <label><input
                type="radio"
                checked={messageType === "WHISPER"}
                name="type"
                value = {MessageTypes.WHISPER}
                onChange={() => setMessageType("WHISPER")}
              /> {MessageTypes.WHISPER}</label>
            <label><input
                type="radio"
                checked={messageType === "NORMAL"}
                name="type"
                value = {MessageTypes.NORMAL}
                onChange={() => setMessageType("NORMAL")}
              /> {MessageTypes.NORMAL}</label>
              <label><input
                type="radio"
                checked={messageType === "ALOUD"}
                name="type"
                value = {MessageTypes.ALOUD}
                onChange={() => setMessageType("ALOUD")}
              /> {MessageTypes.ALOUD}</label>
              <label><input
                type="radio"
                checked={messageType === "SCREAM"}
                name="type"
                value = {MessageTypes.SCREAM}
                onChange={() => setMessageType("SCREAM")}
              /> {MessageTypes.SCREAM}</label>
              <label><input
                type="radio"
                checked={messageType === "CRY"}
                name="type"
                value = {MessageTypes.CRY}
                onChange={() => setMessageType("CRY")}
              /> {MessageTypes.CRY}</label>
            </form>
            <button  className="send-btn" disabled={!isWritten} onClick={Send}><RiSendPlaneLine  size="30"/></button>
            </div>
          </>
      ) : (
        <>
          <p className="no-login-message"><BiMessageError  size="25"/> Please Sign In to send chat messages</p>
          <button className="signin-btn" onClick={logIn}>Sign In <FcGoogle size="30"/></button>
        </>
      )}
    </div>
  );
};
