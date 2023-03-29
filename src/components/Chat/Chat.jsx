import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../userContext";
import { SendMessage } from "../SendMessage/SendMessage"
import { ChatBox } from "./ChatBox"

export const Chat = () => {

    const { setChatID } = useUser();
    const { chatID } = useParams();

    useEffect(() => {
        if(chatID) setChatID(chatID);
        else setChatID('main');
    }, [chatID, setChatID])
    
    return(
        <>
        <ChatBox />
        <SendMessage />
        </>
        
    )
}