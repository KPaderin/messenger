import React from 'react';
import styles from './ChatMessages.module.css';
import Message from '../Message/Message'
import {useDispatch} from "react-redux";
import {sendMessageAsync} from "../../store/asyncActions/sendMessageAsync";
import useResizeTextArea from "../../hooks/useResizeTextarea";
import SideWrap from "../common/wraps/rowDividedWrap/SideWrap";
import CenterWrap from "../common/wraps/rowDividedWrap/CenterWrap";

const ChatMessages = ({selectedChat}) => {
    const dispatch = useDispatch();
    const messageText = useResizeTextArea()

    const handleSendMessage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(sendMessageAsync(selectedChat.chatId, messageText.value))
    }

    return (
        <div className={styles.chat__messages__wrap}>
            <div className={styles.messages__wrap}>
                {selectedChat.messages.map(item =>
                    <Message
                        selectedChatId={selectedChat.chatId}
                        chatItem={item}
                        key={item.id}
                    />
                )}
            </div>
            <div className={styles.chat__input__area}>
                <SideWrap />
                <CenterWrap>
                    <textarea
                        className={styles.text__area}
                        rows={1}
                        placeholder={"Введите сообщение..."}
                        {...messageText}
                        spellCheck={'false'}
                    />
                    <button
                        onClick={e => handleSendMessage(e)}
                        className={styles.button__send}
                    >Отправить</button>
                </CenterWrap>
                <SideWrap />
            </div>
        </div>
    );
};

export default ChatMessages;