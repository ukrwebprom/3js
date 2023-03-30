import "./sendmessage.scss";
import ContentEditable from "react-contenteditable";
import { useState } from "react";
import { useUser } from "../../userContext";
import { db } from "../../firebase_setup/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { RiSendPlaneLine } from "react-icons/ri";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MessageTypes = [
  "Whisper",
  "Say normally",
  "Aloud",
  "Scream",
  "Hysterical cry",
];

export const SendMessage = () => {
  const { user, chatID } = useUser();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(1);

  const onVolumeChange = (e) => {
    setMessageType(e);
  };
  const Send = async () => {
    const { uid, displayName, photoURL } = user;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      chatID,
      messageType,
      uid,
    });
    setMessage('');
  };

  return (
    <div className="send-container">
      <h3 className="send-title">Say here</h3>
      <ContentEditable
        html={message}
        onChange={evt => setMessage(evt.target.value)}
        className="typearea"
      />

      <div className="send-form">
        <div className="slider-wrapper">
          <p>
            Loudness: <span>{MessageTypes[messageType]}</span>
          </p>
          <Slider
            min={0}
            max={4}
            defaultValue={1}
            dots
            onChange={onVolumeChange}
            step={1}
            dotStyle={{ borderColor: "darkturquoise" }}
            trackStyle={{ backgroundColor: "darkturquoise" }}
          />
        </div>

        <button className="send-btn" disabled={message === ''} onClick={Send}>
          <RiSendPlaneLine size="30" />
        </button>
      </div>
    </div>
  );
};
