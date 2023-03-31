import "./sendmessage.scss";
import { useState } from "react";
import { useUser } from "../../userContext";
import { db } from "../../firebase_setup/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { RiSendPlaneLine } from "react-icons/ri";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import '@blueprintjs/core/lib/css/blueprint.css';
import { EditableText, Classes } from "@blueprintjs/core";

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


  const Send = async (e) => {
    if(e === "") return
    const { uid, displayName, photoURL } = user;
    await addDoc(collection(db, chatID), {
      text: e,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      messageType,
      uid,
    });
    setMessage('');
    
  };

  console.dir(Classes);
  return (
    <div className="send-container">
{/*       <h3 className="send-title">Say here</h3> */}

        <EditableText 
                    alwaysRenderInput = {true}
                    multiline={true} 
                    minLines={1} 
                    maxLines={6} 
                    intent="primary" 
                    placeholder="Say here  ..." 
                    defaultValue = ""
                    confirmOnEnterKey
                    onChange={setMessage}
                    value = {message}
                    onConfirm={Send}
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
