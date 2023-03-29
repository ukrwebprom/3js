import { BsPlusLg } from "react-icons/bs";
import "./addchatbtn.scss";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export const AddChatBtn = ({children}) => {
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate(`/chat/${nanoid()}`)
  }
  return (
      <button className="addchat" onClick={navigateToChat}>
        <p>{children}</p>
        <div className="dot">
          <BsPlusLg />
        </div>
      </button>
  );
};
