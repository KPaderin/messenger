import React from 'react';
import styles from "./SettingsPlusButtons.module.css";
import settingsIcon from "../../../images/settingsIcon.svg";
import plusIcon from "../../../images/plusIcon.svg"

const SettingsPlusButtons = ({settingsOnClick, plusOnClick}) => {
    return (
        <div className={styles.buttonsWrap}>
            <img
                alt="settingsButton"
                src={settingsIcon}
                className={styles.settingsIcon}
                onClick={settingsOnClick}
            />
            <img
                alt="newChatButton"
                src={plusIcon}
                className={styles.plusIcon}
                onClick={plusOnClick}
            />
        </div>
    );
};

export default SettingsPlusButtons;