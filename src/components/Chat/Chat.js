import React, {useMemo} from 'react';
import styles from './Chat.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';
import {useDispatch, useSelector} from 'react-redux';
import ChatSettings from "../ChatSettings/ChatSettings";
import {deleteChatById} from "../../store/asyncActions/deleteChatById";
import ChatMembers from "../ChatMembers/ChatMembers";
import ChatUpdate from "../ChatUpdate/ChatUpdate";
import useActive from "../../hooks/useActive";
import {chatsListSelector, selectedChatSelector} from "../../store/selectors";
import {compareWithSessionLogin} from "../../helpers/compareWithSessionLogin";

const Chat = () => {
    const menuActive = useActive(false);
    const membersListActive = useActive(false)
    const editChatActive = useActive(false)
    const chatSettingsActive = useActive(false)

    const chatsList = useSelector(chatsListSelector)
    const selectedChat = useSelector(selectedChatSelector)
    const dispatch = useDispatch();

    const isOwner = compareWithSessionLogin(selectedChat.ownerLogin)

    const settingsOption = useMemo(() => [
        {text:"Участники", onClickFunction:() => membersListActive.changeActive(), id:1, publicOption:true},
        {text:"Редактировать", onClickFunction:() => editChatActive.changeActive(), id:2, publicOption:false},
        {text:"Удалить", onClickFunction:() => {dispatch(deleteChatById(selectedChat.chatId))}, id:3, publicOption:false}
    ], [selectedChat.chatId])

    return (
        <div className={styles.chat__wrap}>
            <ChatHeader
                items={selectedChat}
                chatSettingsActive={chatSettingsActive.isActive}
                changeChatSettingsActive={chatSettingsActive.changeActive}
                changeMenuActive={menuActive.changeActive}
            />
            <ChatSettings
                itemsList={settingsOption.filter(item => {return item.publicOption || (isOwner)})}
                isActive={chatSettingsActive.isActive}
            />
            <ChatMembers
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

export default React.memo(Chat);
