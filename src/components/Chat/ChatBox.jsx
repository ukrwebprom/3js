import './chatbox.scss';
import { useEffect, useState } from "react";
import { useUser } from "../../userContext";
import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import { Message } from '../Message/Message';

export const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const { chatID } = useUser();

    useEffect(() => {
        const q=query(
            collection(db, "messages"),
            orderBy("createdAt"),
            where("chatID", "==", chatID),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach(
                (doc) => {messages.push({...doc.data(), id: doc.id})}
            );
            setMessages(messages);
            console.log(messages);
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
        </div>
    ) 
}