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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MessageTypes = [
  "Whisper",
  "Say normally",
  "Aloud",
  "Scream",
  "Hysterical cry"
];

export const SendMessage = () => {

  const { user, logIn, chatID } = useUser();
  const text = useRef("");
  const [isWritten, setIsWritten] = useState(false);
  const [messageType, setMessageType] = useState(1);

  const handleChange = (evt) => {
    text.current = evt.target.value;
    setIsWritten(text.current !== "");
  };
  const handleBlur = () => {
    console.dir(text.current);
  };
  const onVolumeChange = e => {
    setMessageType(e);
  }
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
          <h3 className="send-title">Say here</h3>
          <ContentEditable
            html={text.current}
            onBlur={handleBlur}
            onChange={handleChange}
            className="typearea"
          />

            <div className="send-form">
            <div className="slider-wrapper">
              <p>Loudness: <span>{MessageTypes[messageType]}</span></p>
            <Slider min={0} max={4} defaultValue={1} 
              dots
              onChange = {onVolumeChange} 
              step={1}
              dotStyle={{ borderColor: 'darkturquoise' }}
              trackStyle={{ backgroundColor: 'darkturquoise'}}
               />
            </div>
            
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
