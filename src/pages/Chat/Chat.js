import React from 'react';
import styles from './Chat.module.css';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import ChatMessages from '../../components/ChatMessages/ChatMessages';
import ChatMenu from '../../components/ChatMenu/ChatMenu';
import {useDispatch, useSelector} from 'react-redux';
import ChatSettings from "../../components/ChatSettings/ChatSettings";
import {deleteChatById} from "../../store/asyncActions/deleteChatById";
import MembersList from "../../components/MembersList/MembersList";
import ChatUpdate from "../../components/ChatUpdate/ChatUpdate";
import useActive from "../../hooks/useActive";
import {chatsListSelector, selectedChatSelector} from "../../store/selectors";

const Chat = () => {
    const menuActive = useActive(false);
    const membersListActive = useActive(false)
    const editChatActive = useActive(false)
    const chatSettingsActive = useActive(false)

    const chatsList = useSelector(chatsListSelector)
    const selectedChat = useSelector(selectedChatSelector)
    const dispatch = useDispatch();

    const isOwner = (localStorage.getItem('login') !== null)
        && (selectedChat.ownerLogin === localStorage.getItem('login').replaceAll("\"", ""))

    const opt1 = {text:"Участники", onClickFunction:() => membersListActive.changeActive(), id:1, publicOption:true}
    const opt2 = {text:"Редактировать", onClickFunction:() => editChatActive.changeActive(), id:2, publicOption:false}
    const opt3 = {text:"Удалить", onClickFunction:() => {dispatch(deleteChatById(selectedChat.chatId))}, id:3, publicOption:false}
    const opt = [opt1, opt2, opt3]
    return (
        <div className={styles.chat__wrap}>
            <ChatHeader
                items={selectedChat}
                chatSettingsActive={chatSettingsActive.isActive}
                changeChatSettingsActive={chatSettingsActive.changeActive}
                changeMenuActive={menuActive.changeActive}
            />
            <ChatSettings
                itemsList={opt.filter(item => {return item.publicOption || (isOwner)})}
                isActive={chatSettingsActive.isActive}
            />
            <MembersList
                members={selectedChat.chatMembers}
                chatId={selectedChat.chatId}
                isOwner={isOwner}
                {...membersListActive}
            />
            <ChatUpdate
                chatName={selectedChat.chatName}
                chatId={selectedChat.chatId}
                isDefaultImage={selectedChat.chatImage !== null && selectedChat.chatImage !== "null"}
                {...editChatActive}
            />
            <ChatMenu
                {...menuActive}
                chatsList={chatsList}
            />
            <ChatMessages selectedChat={selectedChat} />
        </div>
    );
};

export default Chat;
