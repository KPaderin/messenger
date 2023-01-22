import React, {useCallback} from 'react';
import styles from './ChatMessages.module.css';
import {useDispatch} from "react-redux";
import {sendMessageAsync} from "../../store/asyncActions/sendMessageAsync";
import MessagesList from "../MessagesList/MessagesList";
import MessageInputForm from "../MessageInputForm/MessageInputForm";
import UserProfile from "../UserProfile/UserProfile";   
import useActive2 from "../../hooks/useActive2";

const ChatMessages = ({selectedChat}) => {
    const dispatch = useDispatch();
    const [userProfileActive, changeUserProfileActive] = useActive2();

    const handleSendMessage = useCallback((messageText) => {
        dispatch(sendMessageAsync(selectedChat.chatId, messageText))
    },[dispatch, selectedChat.chatId])

    const clickUserImageHandler = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        changeUserProfileActive(true)
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
            <UserProfile isActive={userProfileActive} changeActive={changeUserProfileActive}/>
        </div>
    );
};

export default React.memo(ChatMessages);