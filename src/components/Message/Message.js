import React from 'react';
import styles from './Message.module.css'
import logo from '../../images/logo.svg'
import pencilImg from './pencil.svg'
import trashImg from './trash.svg'
import {formatDateString} from "../../services/formatDateString";
import {deleteMessageAsync} from "../../store/asyncActions/deleteMessageAsync";
import {useDispatch} from "react-redux";
import {editMessageAsync} from "../../store/asyncActions/editMessageAsync";

const Message = ({selectedChatId, chatItem}) => {
    const dispatch = useDispatch()

    const delMessage = function() {
        if(window.confirm('Удалить?'))
            dispatch(deleteMessageAsync(selectedChatId, chatItem.id))
    }

    const editMessage = function() {
        let editedText = window.prompt("Отредактируйте сообщение", chatItem.text)
        dispatch(editMessageAsync(selectedChatId, chatItem.id, editedText))
    }

    const buttonEditMessage = (() => {
        if(localStorage.getItem('login') && chatItem.createdBy.login === localStorage.getItem('login').replaceAll("\"", "")) {
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
                        src={chatItem.createdBy.image === null ? logo
                            : `data:image/svg+xml;base64,${chatItem.createdBy.image}`}
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
