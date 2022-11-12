import React from 'react';
import styles from './ChatMessages.module.css';
import {useDispatch} from "react-redux";
import {sendMessageAsync} from "../../store/asyncActions/sendMessageAsync";
import MessagesList from "../MessagesList/MessagesList";
import MessageInputForm from "../MessageInputForm/MessageInputForm";

const ChatMessages = ({selectedChat}) => {
    const dispatch = useDispatch();

    const handleSendMessage = (messageText) => {
        dispatch(sendMessageAsync(selectedChat.chatId, messageText))
    }

    return (
        <div className={styles.chat__messages__wrap}>
            <MessagesList
                messagesList={selectedChat.messages}
                chatId={selectedChat.chatId}
            />
            <MessageInputForm
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default ChatMessages;