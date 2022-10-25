import React, {useEffect, useState} from 'react';
import styles from './ChatWrap.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';
import {useDispatch, useSelector} from 'react-redux';
import ChatSettings from "../ChatSettings/ChatSettings";
import {deleteChatById} from "../../store/asyncActions/deleteChatById";
import MembersList from "../MembersList/MembersList";
import ChatUpdate from "../ChatUpdate/ChatUpdate";

const ChatWrap = () => {
    const [selectedChat, setSelectedChat] = useState({"messages":[]})
    const [isActiveMembersList, setIsActiveMembersList] = useState(false)
    const [isActiveEditChat, setIsActiveEditChat] = useState(false)
    const selectedChatId = useSelector(state => state.chats.selectedChatId)
    const chatsList = useSelector(state => state.chats.chatsList)
    const dispatch = useDispatch();

    const [MenuActive, SetMenuActive] = useState(false);
    const [chatSettingsActive, setChatSettingsActive] = useState(false);
    const isOwner = (localStorage.getItem('login') !== null)
        && (selectedChat.ownerLogin === localStorage.getItem('login').replaceAll("\"", ""))

    useEffect(() => {
        chatsList.map( chat => {
            if(chat.chatId === selectedChatId)
                setSelectedChat(chat)
            return chat;
        })
        setChatSettingsActive(false)
    }, [selectedChatId, chatsList])

    const opt1 = {text:"Участники", onClickFunction:() => setIsActiveMembersList(true), id:1, publicOption:true}
    const opt2 = {text:"Редактировать", onClickFunction:() => setIsActiveEditChat(true), id:2, publicOption:false}
    const opt3 = {text:"Удалить", onClickFunction:() => {dispatch(deleteChatById(selectedChatId))}, id:3, publicOption:false}
    const opt = [opt1, opt2, opt3]
    return (
        <div className={styles.chat__wrap}>
            <ChatHeader items={selectedChat}
                        chatSettingsActive={chatSettingsActive}
                        setChatSettingsActive={setChatSettingsActive}
                        MenuActive={MenuActive} SetMenuActive={SetMenuActive} />
            <ChatSettings isOwner={isOwner} chatSettingsActive={chatSettingsActive}
                          itemsList={opt}/>
            <MembersList
                chatId={selectedChatId}
                isOwner={isOwner}
                isActive={isActiveMembersList}
                setIsActive={setIsActiveMembersList}
            />
            <ChatUpdate
                chatName={selectedChat.chatName}
                chatId={selectedChatId}
                isActive={isActiveEditChat}
                setIsActive={setIsActiveEditChat}
                isDefaultImage={selectedChat.chatImage !== null && selectedChat.chatImage !== "null"}
            />
            <ChatMenu MenuActive={MenuActive} SetMenuActive={SetMenuActive}/>
            <ChatMessages selectedChat={selectedChat} SetSelectedChat={setSelectedChat}
                          selectedChatId={selectedChatId}/>
        </div>
    );
};

export default ChatWrap;
