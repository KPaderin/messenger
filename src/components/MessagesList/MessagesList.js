import React from 'react';
import styles from "./MessagesList.module.css";
import Message from "../Message/Message";
import {compareWithSessionLogin} from "../../helpers/compareWithSessionLogin";

const MessagesList = ({messagesList, chatId}) => {

    return (
        <div className={styles.messages__wrap}>
            {messagesList.map(message =>
                <Message
                    selectedChatId={chatId}
                    chatItem={message}
                    isMutable={compareWithSessionLogin(message.createdBy.login)}
                    key={message.id}
                />
            )}
        </div>
    );
};

export default MessagesList;