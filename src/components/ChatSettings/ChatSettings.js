import React from 'react';
import styles from './СhatSettings.module.css'
import classNames from "classnames";
const ChatSettings = ({chatSettingsActive, isOwner, itemsList}) => {
    const changeableClass = classNames({
        [styles.wrap]:true,
        [styles.active]:chatSettingsActive
    })
    return (
        <div className={changeableClass}>
            <div className={styles.side__wrap} />
            <div className={styles.center__wrap}>
                <ul className={styles.chat__settings}>
                    {itemsList.map(item => {
                        if(!isOwner && (item.publicOption === false))
                            return null
                        return <li key={item.id} className={styles.item}
                                   onClick={item.onClickFunction}>
                            {item.text}
                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.side__wrap}/>
        </div>
    );
};

export default React.memo(ChatSettings);