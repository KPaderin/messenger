import React from 'react';
import styles from "./ChatsList.module.css"
import logo from "../../images/logo.svg";

const ChatsList = ({chatsList, onClick}) => {
    return (
        <ul className={styles.chatsListContainer}>
            {chatsList.map(chat =>
                <li onClick={onClick} className={styles.chatsListContainer__chat} data-key={chat.chatId}
                    key={chat.chatId}>
                    <img alt="chatLogo"
                         src={(chat.chatImage === null ||  chat.chatImage === "null") ? logo : `data:image/svg+xml;base64,${chat.chatImage}`}
                         className={styles.chat__image}/>
                    {chat.chatName}
                </li>
            )}
        </ul>
    );
};

export default ChatsList;