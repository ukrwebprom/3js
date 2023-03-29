import { useUser } from "../../userContext";
import './dropdown.scss';

export const DropDown = ({hide, showModal}) => {
    const { logOut } = useUser();

    const onSignOut = () => {
        logOut();
        hide();
    }
    const onChangeName = () => {
        showModal();
        hide();
    }
    return (
        <ul className="dropdown">
            <li onClick={onChangeName}>Change chat name</li>
            <li onClick={onSignOut}>Sign Out</li>
        </ul>
    )
}