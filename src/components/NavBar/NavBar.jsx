import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { clsx } from 'clsx';
import { FcGoogle } from 'react-icons/fc';
import { SiLivechat } from 'react-icons/si';
import { useUser } from "../../userContext";
import { DropDown } from "./DropDown";
import { SetChatName } from "../SetChatName/SetChatName";



import './navbar.scss';

export const NavBar = () => {
    const { user, logIn, chatname } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [isHome, setIsHome] = useState(true);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsHome(location.pathname === "/");
    }, [location])

    const toggleDropDown = () => {
        setShowDropDown(e => !e);
    }
    const toggleModal = () => {
        setShowModal(e => !e);
    }
    return (
        <>
        <nav className={clsx("navbar", isHome && "mainpage")}>
            {showDropDown && (<DropDown hide={toggleDropDown} showModal={toggleModal} />)}
            {showModal && (<SetChatName hide={toggleModal} />)}
            <div className="logo" onClick={() => navigate('/')}>
                <SiLivechat width="50px" />
                <h1 className="title">WLCh</h1>
            </div>
            
            {user? 
            <button className={clsx("signin-btn", isHome && "mainpage")}  onClick={toggleDropDown}><div className="content">Chat name<span>{chatname}</span></div><img src={user.photoURL} className="user-img" alt={user.displayName} /></button> :
            <button className={clsx("signin-btn", isHome && "mainpage")} onClick={logIn}>Sign In <FcGoogle size="30"/></button>
            }
            
        </nav>
        <Outlet />
        </>
    )
}