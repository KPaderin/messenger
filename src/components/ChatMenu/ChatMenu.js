import React, { useState } from 'react'
import styles from './ChatMenu.module.css';
import newChatIcon from './newChatIcon.svg';
import settingsIcon from './settingsIcon.svg';
import logo from '../../svg-2.svg';
import CreateChat from '../CreateChat/CreateChat'
import {useDispatch, useSelector} from "react-redux";
import {selectChatId} from "../../store/actionCreators/selectChatId";

const ChatMenu = ({MenuActive, SetMenuActive}) => {
    const [creatingChat, setCreatingChat] = useState(false)

    const dispatch = useDispatch();
    const chatsList = useSelector(state => state.chats.chatsList)

    const setChat = function(e) {
        let chatId = e.target.getAttribute('data-key')
        dispatch(selectChatId(chatId))
        localStorage.setItem('chatId', chatId)
    }

    return (
        <div onClick={() => {SetMenuActive(false)}}
            className={MenuActive ? styles.menu + ' ' + styles.active : styles.menu}>
            <div className={styles.blur}/>
            <div onClick={(e) => {e.stopPropagation()}}
                className={styles.menu__content}>
                <ul className={styles.chat__item__wrap}>
                    {chatsList.map(chat =>
                        <li onClick={setChat} className={styles.chat__item} data-key={chat.chatId}
                            key={chat.chatId}>
                            <img alt="chatLogo"
                                 src={(chat.chatImage === null ||  chat.chatImage === "null") ? logo : `data:image/svg+xml;base64,${chat.chatImage}`}
                                 className={styles.chat__logo}/>
                            {chat.chatName}
                        </li>
                    )}
                </ul>
                <div className={styles.buttons__wrap}>
                    <img
                        alt="settingsButton"
                        src={settingsIcon}
                        className={styles.settings__logo}
                    />
                    <img
                        alt="newChatButton"
                        src={newChatIcon}
                        className={styles.new__chat__logo}
                        onClick={() => {
                            SetMenuActive(false)
                            setCreatingChat(true)
                        }}
                    />
                </div>
            </div>
            <CreateChat creatingChat={creatingChat} setCreatingChat={setCreatingChat}/>
        </div>
    );
};

export default ChatMenu;
