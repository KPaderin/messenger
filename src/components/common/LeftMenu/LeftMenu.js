import React from 'react';
import styles from "./LeftMenu.module.css";
import classNames from "classnames";

const LeftMenu = ({isActive, changeActive, children}) => {
    const changeableClass = classNames({
        [styles.menuWrap]:true,
        [styles.active]:isActive
    })

    return (
        <div onClick={() => {changeActive(false)}}
             className={changeableClass}>
            <div className={styles.blur}/>
            <div onClick={(e) => {e.stopPropagation()}}
                 className={styles.menu__content}
            >
                {children}
            </div>
        </div>
    );
};

export default LeftMenu;