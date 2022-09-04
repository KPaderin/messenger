import React from 'react';
import styles from './Message.module.css'
import logo from '../../svg-2.svg'

const Message = ({chatItem}) => {
    const MONTH_LOCAL = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    // eslint-disable-next-line
    Number.prototype.extendToTwoDigits = function() { return ("0" + this).slice(-2) }

    function getDateString(rawDate) {
        const today = new Date()
        if (!rawDate)
            return `Сегодня ${today.getHours().extendToTwoDigits()}:${today.getMinutes().extendToTwoDigits()}`
        const createdAt = new Date(rawDate)
        if (today.getFullYear() === createdAt.getFullYear()
            && today.getMonth() === createdAt.getMonth()
            && today.getDate() === createdAt.getDate()) {
            return `Сегодня ${createdAt.getHours().extendToTwoDigits()}:${createdAt.getMinutes().extendToTwoDigits()}`
        } else {
            return `${createdAt.getDate().extendToTwoDigits()} ${MONTH_LOCAL[createdAt.getMonth()]} ${createdAt.getHours().extendToTwoDigits()}:${createdAt.getMinutes().extendToTwoDigits()}`
        }
    }
    return (
        <div className={styles.wrap}>
            <div className={styles.side__wrap}>
                <div className={styles.user__icon__wrap}>
                    <img className={styles.user__icon} alt={"userIcon"}
                        src={chatItem.createdBy.image === null ? logo : chatItem.createdBy.image}
                    />
                </div>
            </div>
            <div className={styles.center__wrap}>
                <div className={styles.message__area}>
                    <div className={styles.name}>{chatItem.createdBy.name}</div>
                    <div className={styles.message__text}>{chatItem.text}</div>
                    <div className={styles.message__date}>{getDateString(chatItem.createdAt)}</div>
                </div>
            </div>
            <div className={styles.side__wrap}>
            </div>
        </div>
    );
};

export default Message;
