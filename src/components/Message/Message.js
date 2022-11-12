import React from 'react';
import styles from './Message.module.css'
import {formatDateString} from "../../helpers/formatDateString";
import {deleteMessageAsync} from "../../store/asyncActions/deleteMessageAsync";
import {useDispatch} from "react-redux";
import {editMessageAsync} from "../../store/asyncActions/editMessageAsync";
import PencilTrashButtons from "../common/PencilTrashButtons/PencilTrashButtons";
import MessageWrap from "../common/wraps/MessageWrap/MessageWrap";

const Message = ({selectedChatId, chatItem, isMutable}) => {
    const dispatch = useDispatch()

    const delMessage = function() {
        if(window.confirm('Удалить?'))
            dispatch(deleteMessageAsync(selectedChatId, chatItem.id))
    }

    const editMessage = function() {
        let editedText = window.prompt("Отредактируйте сообщение", chatItem.text)
        dispatch(editMessageAsync(selectedChatId, chatItem.id, editedText))
    }

    return (
        <MessageWrap userImage={chatItem.createdBy.image}>
            <article className={styles.message__area}>
                <div className={styles.name}>{chatItem.createdBy.name}</div>
                <div className={styles.message__text}>{chatItem.text}</div>
                <div className={styles.message__date}>
                    {isMutable &&
                        <PencilTrashButtons pencilOnClick={editMessage} trashOnClick={delMessage}/>
                    }
                    {formatDateString(chatItem.createdAt)}
                </div>
            </article>
        </MessageWrap>
    );
};

export default React.memo(Message);
