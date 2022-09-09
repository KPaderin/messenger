import React, {useEffect, useState} from 'react';
import styles from './ChatWrap.module.css';
import ChatWrapHeader from '../ChatWrapHeader/ChatWrapHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';
import {getMessages} from "../../services/getMessagesAndChat";

const ChatWrap = () => {
    const [dataChats, setDataChats] = useState(
        {"chats": [{"messages":[], "name":"", "image":null, "id":""}]}
    )
    const [SelectedChat, SetSelectedChat] = useState(dataChats.chats[0])
    const [ChatId, SetChatId] = useState("")

    const [MenuActive, SetMenuActive] = useState(false);

    useEffect(() => {
        getMessages(setDataChats, SetChatId)
    }, [])

    useEffect(() => {
        dataChats.chats.map( chat => {
            if(chat.id === ChatId)
                SetSelectedChat(chat)
            //console.log(chat)
            return chat;
        })
    }, [ChatId, dataChats])

    return (
        <div className={styles.chat__wrap}>
            <ChatWrapHeader items={SelectedChat}
                            MenuActive={MenuActive} SetMenuActive={SetMenuActive} />
            <ChatMenu MenuActive={MenuActive} SetMenuActive={SetMenuActive}
                      SetChatId={SetChatId}
                      items={dataChats.chats}/>
            <ChatMessages selectedChat={SelectedChat} SetSelectedChat={SetSelectedChat}
                          chatId={ChatId}/>
        </div>
    );
};

export default ChatWrap;
