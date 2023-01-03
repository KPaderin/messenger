import React, {useMemo} from 'react'
import CreateChat from '../CreateChat/CreateChat'
import {useDispatch} from "react-redux";
import useActive from "../../hooks/useActive";
import ChatsList from "../ChatsList/ChatsList";
import SettingsPlusButtons from "../common/SettingsPlusButtons/SettingsPlusButtons";
import LeftMenu from "../common/LeftMenu/LeftMenu";
import {selectChatByIdAsync} from "../../store/asyncActions/selectChatByIdAsync";

const ChatMenu = ({isActive, changeActive, chatsList}) => {
    const creatingChatActive = useActive()
    const dispatch = useDispatch();

    const handleSetChat = useMemo(() => function(e) {
        let chatId = e.target.getAttribute('data-key')
        dispatch(selectChatByIdAsync(chatId))
    }, [])

    const handleNewChat = useMemo(() => function(e) {
        e.preventDefault();
        changeActive(false)
        creatingChatActive.changeActive(true)
    }, [])

    return (
        <LeftMenu isActive={isActive} changeActive={changeActive}>
            <ChatsList
                chatsList={chatsList}
                onClick={handleSetChat}
            />
            <SettingsPlusButtons plusOnClick={handleNewChat}/>
            <CreateChat {...creatingChatActive}/>
        </LeftMenu>
    );
};

export default ChatMenu;
