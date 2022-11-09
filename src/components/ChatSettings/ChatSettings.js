import React from "react";
import styles from "./СhatSettings.module.css"
import classNames from "classnames";

const ChatSettings = ({isActive, itemsList}) => {
    const changeableClass = classNames({
        [styles.wrap]:true,
        [styles.active]:isActive
    })
    return (
        <div className={changeableClass}>
            <div className={styles.side__wrap} />
            <ul className={styles.chat__settings}>
                {itemsList.map(item =>
                    <li key={item.id}
                        className={styles.item}
                        onClick={item.onClickFunction}>
                            {item.text}
                    </li>
                )}
            </ul>
            <div className={styles.side__wrap}/>
        </div>
    );
};

export default React.memo(ChatSettings);