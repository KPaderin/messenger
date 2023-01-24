import React, {useCallback, useRef, useState} from 'react';
import styles from "./MessagesList.module.css";
import Message from "../Message/Message";
import {compareWithSessionLogin} from "../../helpers/compareWithSessionLogin";
import useScroll from "../../hooks/useScroll";
import {useDispatch} from "react-redux";
import {fetchMessagesAsync} from "../../store/asyncActions/fetchMessagesAsync";

const MessagesList = ({messagesList, chatId, clickUserImage}) => {
    const containerRef = useRef()
    const paginationContainerRef = useRef()
    const dispatch = useDispatch();
    const [cntMessage, setCntMessage] = useState(0)

    useScroll(containerRef, paginationContainerRef, () => fetchNewMessage())

    const fetchNewMessage = useCallback(() => {
        if(cntMessage !== messagesList.length)
        {
            dispatch(fetchMessagesAsync(chatId))
            setCntMessage(messagesList.length)
        }
    }, [chatId, cntMessage, dispatch, messagesList.length])

    return (
        <div ref={containerRef} className={styles.messages__wrap}>
            {messagesList.map(message =>
                <Message
                    clickUserImage={clickUserImage}
                    selectedChatId={chatId}
                    chatItem={message}
                    isMutable={compareWithSessionLogin(message.createdBy.login)}
                    key={message.id}
                />
            )}
            {messagesList.length && <div ref={paginationContainerRef} style={{marginTop:"1px"}}/>}
        </div>
    );
};

export default React.memo(MessagesList);