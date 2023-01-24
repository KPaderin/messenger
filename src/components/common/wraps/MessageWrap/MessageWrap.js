import React from 'react';
import styles from "./MessageWrap.module.css";
import SideWrap from "../rowDividedWrap/SideWrap";
import logo from "../../../../images/logo.svg";
import CenterWrap from "../rowDividedWrap/CenterWrap";

const MessageWrap = ({children, userImage, imageOnClick}) => {
    return (
        <article className={styles.wrap}>
            <SideWrap className={styles.iconWrap_right}>
                <div className={styles.userIconWrap} onClick={imageOnClick}>
                    <img className={styles.userIcon} alt={"userIcon"}
                         src={(userImage === null || userImage === 'null') ? logo
                             : `data:image/svg+xml;base64,${userImage}`}
                    />
                </div>
            </SideWrap>
            <CenterWrap>
                {children}
            </CenterWrap>
            <SideWrap />
        </article>
    );
};

export default MessageWrap;