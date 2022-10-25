import React from 'react';
import styles from './ChatHeader.module.css';
import menuButtonImg from './menu-burger.svg';
import optionsButtonImage from './options.svg';
import logo from '../../svg-2.svg';

const ChatHeader = ({items, MenuActive, SetMenuActive, chatSettingsActive, setChatSettingsActive}) => {
    const onClickButtonOptions = function () {
        setChatSettingsActive(!chatSettingsActive);
    }
    return (
        <div className={styles.chat__wrap__header}>
            <div className={styles.side__wrap}>
                <button onClick={() => {SetMenuActive(!MenuActive)}}
                        className={styles.button__menu}>
                    <img alt="menuButton" src={menuButtonImg}/>
                </button>
            </div>
            <div className={styles.center__wrap}>
                <img alt="chatLogo"
                     src={(items.chatImage === null || items.chatImage === "null")
                         ? logo
                         : `data:image/svg+xml;base64,${items.chatImage}`}
                     className={styles.chat__logo}/>
                {items.chatName}
                <button onClick={onClickButtonOptions}
                        className={chatSettingsActive
                    ? styles.button__options + ' ' + styles.rotate__button
                    : styles.button__options}>
                    <img className={styles.button__options__img}
                         alt="settingsButton" src={optionsButtonImage}/>
                </button>
            </div>
            <div className={styles.side__wrap}/>
        </div>
    );
};

export default ChatHeader;
