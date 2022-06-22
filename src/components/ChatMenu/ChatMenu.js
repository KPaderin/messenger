import React, { useState } from 'react'
import styles from './ChatMenu.module.css';
import newChatIcon from './newChatIcon.svg';
import settingsIcon from './settingsIcon.svg';
import logo from '../../svg-2.svg';
import { CreateChat } from '../CreateChat/CreateChat'

const ChatMenu = ({items, MenuActive, SetMenuActive, SetChatId}) => {
    const [creatingChat, setCreatingChat] = useState(false)

    const setChat = function(e) {
        SetChatId(e.target.getAttribute('data-key'))
    }

    return (
        <div onClick={() => {SetMenuActive(false)}}
            className={MenuActive ? styles.menu + ' ' + styles.active : styles.menu}>
            <div className={styles.blur}/>
            <div onClick={(e) => {e.stopPropagation()}}
                className={styles.menu__content}>
                <ul className={styles.chat__item__wrap}>
                    {items.map(item =>
                    <li onClick={setChat} className={styles.chat__item} data-key={item.id}
                        key={item.id}>
                        <img alt="chatLogo"
                             src={item.image === null ? logo : `data:image/svg;base64,${item.image}`}
                             className={styles.chat__logo}/>
                        {item.name}
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
