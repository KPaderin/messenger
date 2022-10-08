import React from 'react';
import styles from './Message.module.css'
import logo from '../../logoKilogram.svg'
import pencilImg from './pencil.svg'
import trashImg from './trash.svg'
import {deleteMessage} from "../../services/serviceMessage";
import {formatDateString} from "../../services/formatDateString";

const Message = ({selectedChatId, chatItem}) => {
    const delMessage = function() {
        if(window.confirm('Удалить?'))
            deleteMessage(selectedChatId, chatItem.id).then((answer) => console.log(answer))
    }

    const editMessage = function() {
        console.log('edit')
    }

    const buttonEditMessage = (() => {
        if(chatItem.createdBy.login === localStorage.getItem('login').replaceAll("\"", "")) {
            return (<>
                <img onClick={() => {editMessage()}} className={styles.button__edit__img} alt="editMessage" src={pencilImg}/>
                <img onClick={() => {delMessage()}} className={styles.button__delete__img} alt="deleteMessage" src={trashImg}/>
            </> )
        }
        else
            return null
    })

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
                    <div className={styles.message__date}>
                        {buttonEditMessage()}
                        {formatDateString(chatItem.createdAt)}
                    </div>
                </div>
            </div>
            <div className={styles.side__wrap}>
            </div>
        </div>
    );
};

export default React.memo(Message);
