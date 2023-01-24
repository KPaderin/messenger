import React, {useCallback, useState} from 'react';
import styles from './ChatMessages.module.css';
import {useDispatch} from "react-redux";
import {sendMessageAsync} from "../../store/asyncActions/sendMessageAsync";
import MessagesList from "../MessagesList/MessagesList";
import MessageInputForm from "../MessageInputForm/MessageInputForm";
import UserProfile from "../UserProfile/UserProfile";
import useActive from "../../hooks/useActive";
import {compareWithSessionLogin} from "../../helpers/compareWithSessionLogin";

const ChatMessages = ({selectedChat}) => {
    const dispatch = useDispatch();
    const [userProfileActive, changeUserProfileActive] = useActive();
    const [userProfile, setUserProfile] = useState({image:"", name:"", login:""});

    const handleSendMessage = useCallback((messageText) => {
        dispatch(sendMessageAsync(selectedChat.chatId, messageText))
    },[dispatch, selectedChat.chatId])

    const clickUserImageHandler = useCallback((e, user) => {
        e.preventDefault()
        e.stopPropagation()
        changeUserProfileActive(true)
        setUserProfile(user)
    }, [changeUserProfileActive])

    return (
        <div className={styles.chat__messages__wrap}>
            <MessagesList
                messagesList={selectedChat.messages}
                chatId={selectedChat.chatId}
                clickUserImage={clickUserImageHandler}
            />
            <MessageInputForm
                handleSendMessage={handleSendMessage}
            />
            <UserProfile
                isActive={userProfileActive}
                changeActive={changeUserProfileActive}
                userProfile={userProfile}
                isMutable={compareWithSessionLogin(userProfile.login)}
            />
        </div>
    );
};

export default React.memo(ChatMessages);