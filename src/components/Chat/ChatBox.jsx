import './chatbox.scss';
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../userContext";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import { Message } from '../Message/Message';
/* import sanitizeHtml from 'sanitize-html'; */

export const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const { chatID } = useUser();
    const scroll = useRef();

    useEffect(() => {
        const q=query(
            collection(db, chatID),
            orderBy("createdAt"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach(
                (doc) => {messages.push({...doc.data(), id: doc.id})}
            );
            setMessages(messages);
            scroll.current.scrollIntoView({ behavior: "smooth" })
        },
        (error) => console.log(error)
        );
        return () => unsubscribe;

    }, [chatID])


    return(
        <div className="chatbox">
            {messages.map(({avatar, name, text, id, messageType}) => (
                <Message avatar={avatar} name={name} text={text} key={id} type={messageType} />
            ))}
            <span ref={scroll}></span>
        </div>
    ) 
}