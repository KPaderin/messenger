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
        e.stopPropagation()
        let chatId = e.currentTarget.getAttribute('data-key')
        dispatch(selectChatByIdAsync(chatId))
    }, [dispatch])

    const handleNewChat = useMemo(() => function(e) {
        e.preventDefault();
        changeActive(false)
        creatingChatActive.changeActive(true)
    }, [changeActive, creatingChatActive])

    return (
        <LeftMenu isActive={isActive} changeActive={changeActive}>
            <ChatsList
                chatsList={chatsList}
                onClickHandler={handleSetChat}
            />
            <SettingsPlusButtons plusOnClick={handleNewChat}/>
            <CreateChat {...creatingChatActive}/>
        </LeftMenu>
    );
};

export default ChatMenu;
