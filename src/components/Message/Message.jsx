import './message.scss';
export const Message = ({avatar, text, name, type, children}) => {
    const MessageTypes = [
        "WHISPER",
        "NORMAL",
        "ALOUD",
        "SCREAM",
        "CRY"
      ];
    const classNames = itemClass => {
        const c = [itemClass, MessageTypes[type]];
        return c.join(" ");
    }
    return(
        <div className="message-box">
            <img src={avatar} className={classNames("message-box__img")} alt={name}/>
            <div className="message-box__content">
            {children}
{/*                 <p className={classNames("message-box__text")}></p> */}
{/*                 <p className={classNames("message-box__auth")}>{name}</p> */}
            </div>
        </div>
    )
}