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
    const [menuActive, changeMenuActive] = useActive(false);
    const [membersListActive, setMembersListActive] = useActive(false)
    const [editChatActive, setEditChatActive] = useActive(false)
    const [chatSettingsActive, setChatSettingsActive] = useActive(false)

    const chatsList = useSelector(chatsListSelector)
    const selectedChat = useSelector(selectedChatSelector)
    const dispatch = useDispatch();

    const isOwner = compareWithSessionLogin(selectedChat.ownerLogin)

    const settingsOption = useMemo(() => [
        {text:"Участники", onClickFunction:() => setMembersListActive(), id:1, publicOption: true},
        {text:"Редактировать", onClickFunction:() => setEditChatActive(), id:2, publicOption: isOwner},
        {text:"Удалить", onClickFunction:() => {dispatch(deleteChatById(selectedChat.chatId))}, id:3, publicOption:isOwner}
    ].filter(item => {return item.publicOption}),
        [dispatch, isOwner, selectedChat.chatId, setEditChatActive, setMembersListActive])

    return (
        <div className={styles.chat__wrap}>
            <ChatHeader
                items={selectedChat}
                chatSettingsActive={chatSettingsActive}
                changeChatSettingsActive={setChatSettingsActive}
                changeMenuActive={changeMenuActive}
            />
            <ChatSettings
                itemsList={settingsOption}
                isActive={chatSettingsActive}
            />
            <ChatMembers
                members={selectedChat.chatMembers}
                chatId={selectedChat.chatId}
                isOwner={isOwner}
                isActive={membersListActive}
                changeActive={setMembersListActive}
            />
            <ChatUpdate
                chatName={selectedChat.chatName}
                chatId={selectedChat.chatId}
                isDefaultImage={selectedChat.chatImage !== null && selectedChat.chatImage !== "null"}
                isActive={editChatActive}
                changeActive={setEditChatActive}
            />
            <ChatMenu
                isActive={menuActive}
                changeActive={changeMenuActive}
                chatsList={chatsList}
            />
            <ChatMessages selectedChat={selectedChat} />
        </div>
    );
};

export default React.memo(Chat);
