import React from 'react'
import { useUser } from "../../userContext";
import { AddChatBtn } from '../AddChatBtn/AddChatBtn';
import './scene.scss';



export const Scene = () => {
  const { user, logIn } = useUser();
  const onClickLogin = () => {
    logIn();
  }

  return (
    <>
    <div className="header">
      <div className='maintitle'>
        <h1>Warm Lamp Chat</h1>
        <h2>by Yuriy Pochtiennykh</h2>
      </div>
      
      {user && (<div className='add-chat-btn'><AddChatBtn>Create chat room</AddChatBtn></div>)}
      {/* {user && (<Link to="chat" className='chat-link'>Come in</Link>)} */}
    </div>
    
      {!user && (
        <div className="info-slice">
        <h3 className='SignInMessage'>Please <span onClick={onClickLogin} className="login-link">SingIn</span> to use WLCh</h3>
        </div>
      )}
    
    </>
  );
};
