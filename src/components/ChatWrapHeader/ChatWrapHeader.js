import React from 'react';
import styles from './ChatWrapHeader.module.css';
import menuButtonImg from './menu-burger.svg';
import optionsButtonImage from './options.svg';
import logo from '../../svg-2.svg';

const ChatWrapHeader = ({items, MenuActive, SetMenuActive}) => {
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
                     src={items.image === null ? logo : `data:image/svg;base64,${items.image}`}
                     className={styles.chat__logo}/>
                {items.name}
                <button className={styles.button__options}>
                    <img className={styles.button__options__img} alt="optionsButton" src={optionsButtonImage}/>
                </button>
            </div>
            <div className={styles.side__wrap}/>
        </div>
    );
};

export default ChatWrapHeader;
