import { useUser } from "../../userContext";
import { useState } from 'react';
import './setchatname.scss';

export const SetChatName = ({hide}) => {
    const { user, chatname, setChatname } = useUser();
    const [error, setError] = useState(false);
    const placeholder = chatname? chatname : user.displayName;

    const onFormSubmit = e => {
        e.preventDefault();
        if(e.target.elements.chatname.value === '') {
          setError(true);
          return;
        }
        setChatname(e.target.elements.chatname.value);
        hide();
    }
  return (
  <div className="set-name-wrapper">
    <h3 className="set-name-title">Enter chat name</h3>
    <form className="set-name-form" onSubmit={onFormSubmit}>
        <input name="chatname" defaultValue={placeholder}  className="set-name-input" size="14" autoFocus/>
        {error && (<div className='set-name-descriprion'>Chat name can't be empty</div>)}
        <div className='btn-set'>
        <button type="button"  className="set-name-btn" onClick={() => hide()}>Cancel</button>
        <button type="submit"  className="set-name-btn">Apply</button>
        </div>
    </form>
    {/* <div className='set-name-descriprion'>
      {error? "Chat name can't be empty" : ''}
    </div> */}
  </div>
  )
};
