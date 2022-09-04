import React, {useEffect, useState} from 'react';
import styles from './ChatWrap.module.css';
import ChatWrapHeader from '../ChatWrapHeader/ChatWrapHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';
import {getMessages} from "../../api/getMessagesAndChat";

const ChatWrap = () => {
    const [data, setData] = useState(
        {"data": {"chats": [{"messages":[], "name":"", "image":null, "id":""}]}}
    )
    const [Messages, SetMessages] = useState(data.data.chats[0].messages)
    const [Chat, SetChat] = useState(data.data.chats[0])
    const [ChatId, SetChatId] = useState("")

    const [MenuActive, SetMenuActive] = useState(false);

    useEffect(() => {
        getMessages(setData, SetChatId)
    }, []);

    useEffect(() => {
        data.data.chats.map( item => {
            if(item.id === ChatId)
            {
                SetChat(item);
                SetMessages(item.messages);
            }
        })
        console.log(data)
    }, [ChatId]);

    return (
        <div className={styles.chat__wrap}>
            <ChatWrapHeader items={Chat}
                            MenuActive={MenuActive} SetMenuActive={SetMenuActive} />
            <ChatMenu MenuActive={MenuActive} SetMenuActive={SetMenuActive}
                      SetChatId={SetChatId}
                      items={data.data.chats}/>
            <ChatMessages messages={Messages} chatId={ChatId}
                          setMessages={SetMessages}/>
        </div>
    );
};

export default ChatWrap;
