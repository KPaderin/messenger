import React, {useCallback} from 'react';
import styles from './Message.module.css'
import {formatDateString} from "../../helpers/formatDateString";
import {deleteMessageAsync} from "../../store/asyncActions/deleteMessageAsync";
import {useDispatch} from "react-redux";
import {editMessageAsync} from "../../store/asyncActions/editMessageAsync";
import PencilTrashButtons from "../common/PencilTrashButtons/PencilTrashButtons";
import MessageWrap from "../common/wraps/MessageWrap/MessageWrap";

const Message = ({selectedChatId, chatItem, isMutable, clickUserImage}) => {
    const dispatch = useDispatch()

    const delMessage = useCallback(() => {
        if(window.confirm('Удалить?'))
            dispatch(deleteMessageAsync(selectedChatId, chatItem.id))
    },[chatItem.id, dispatch, selectedChatId])

    const editMessage = useCallback(() => {
        let editedText = window.prompt("Отредактируйте сообщение", chatItem.text)
        dispatch(editMessageAsync(selectedChatId, chatItem.id, editedText))
    }, [chatItem.id, chatItem.text, dispatch, selectedChatId])

    const clickImageHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        clickUserImage(e);
    }

    return (
        <MessageWrap userImage={chatItem.createdBy.image} imageOnClick={clickImageHandler}>
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
