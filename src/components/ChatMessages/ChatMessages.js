import React from 'react';
import styles from './ChatMessages.module.css';
import { useEffect, useRef, useState } from 'react';
import Message from '../Message/Message'
import {sendMessage} from "../../api/sendMessages";

const ChatMessages = ({messages, setMessages, chatId}) => {
    const textareaRef = useRef(null);
    const [currentValue, setCurrentValue ] = useState("");
    const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = Math.min(90, scrollHeight) + "px";
    }, [currentValue]);

    return (
        <div className={styles.chat__messages__wrap}>
            <div className={styles.messages__wrap}>
                {messages.map(item =>
                <Message chatItem={item} key={item.id}/>
                )}
            </div>
            <div className={styles.chat__input__area}>
                <div className={styles.side__wrap} />
                <div className={styles.center__wrap}>
                    <textarea ref={textareaRef} value={currentValue}
                              rows={1} placeholder={"Введите сообщение..."}
                              onChange={e=>setCurrentValue(e.target.value)}
                              spellCheck={'false'} className={styles.text__area} />
                    <button onClick={(e) =>
                        sendMessage(e, chatId, textareaRef, setMessages, messages)}
                        className={styles.button__send}>Отправить</button>
                </div>
                <div className={styles.side__wrap} />
            </div>
        </div>
    );
};

export default ChatMessages;