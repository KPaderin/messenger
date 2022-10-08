import React, {useEffect, useState} from 'react';
import styles from './ChatWrap.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';
import {useSelector} from 'react-redux';

const ChatWrap = () => {
    const [SelectedChat, SetSelectedChat] = useState({"messages":[]})
    const selectedChatId = useSelector(state => state.chats.selectedChatId)
    const chatsList = useSelector(state => state.chats.chatsList)

    const [MenuActive, SetMenuActive] = useState(false);

    useEffect(() => {
        chatsList.map( chat => {
            if(chat.chatId === selectedChatId)
                SetSelectedChat(chat)
            return chat;
        })
    }, [selectedChatId, chatsList])

    return (
        <div className={styles.chat__wrap}>
            <ChatHeader items={SelectedChat}
                        MenuActive={MenuActive} SetMenuActive={SetMenuActive} />
            <ChatMenu MenuActive={MenuActive} SetMenuActive={SetMenuActive}/>
            <ChatMessages selectedChat={SelectedChat} SetSelectedChat={SetSelectedChat}
                          selectedChatId={selectedChatId}/>
        </div>
    );
};

export default ChatWrap;
