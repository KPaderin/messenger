import React, {useCallback} from 'react';
import styles from './ChatHeader.module.css';
import menuButtonImg from '../../images/menu-burger.svg';
import optionsButtonImage from '../../images/options.svg';
import logo from '../../images/logo.svg';
import classNames from "classnames";
import CenterWrap from "../common/wraps/rowDividedWrap/CenterWrap";
import SideWrap from "../common/wraps/rowDividedWrap/SideWrap";

const ChatHeader = ({items, changeMenuActive, chatSettingsActive, changeChatSettingsActive}) => {
    const onClickButtonOptions = function () {
        changeChatSettingsActive();
    }
    const changeableClass = classNames({
        [styles.button__options]:true,
        [styles.rotate__button]:chatSettingsActive
    })

    const handleMenuOpen = useCallback(() => function(e) {
        e.preventDefault();
        changeMenuActive();
    }, [changeMenuActive])

    return (
        <div className={styles.chat__wrap__header}>
            <SideWrap>
                <button onClick={handleMenuOpen()}
                        className={styles.button__menu}>
                    <img alt="menuButton" src={menuButtonImg}/>
                </button>
            </SideWrap>
            <CenterWrap className={styles.center__wrap}>
                <img alt="chatLogo"
                     src={(items.chatImage === null || items.chatImage === "null")
                         ? logo
                         : `data:image/svg+xml;base64,${items.chatImage}`}
                     className={styles.chat__logo}/>
                {items.chatName}
                <button onClick={onClickButtonOptions}
                        className={changeableClass}>
                    <img className={styles.button__options__img}
                         alt="settingsButton" src={optionsButtonImage}/>
                </button>
            </CenterWrap>
            <SideWrap/>
        </div>
    );
};


export default React.memo(ChatHeader);
