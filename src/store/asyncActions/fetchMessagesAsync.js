import store from "../store";
import {getMessagesApi} from "../../services/getChatsList";
import {addMessagesBeforeOld} from "../actionCreators/addMessagesBeforeOld";

export const fetchMessagesAsync = (chatId) => {
    let offsetChats = 0
    let offsetMessages = 0
    let chatList = store.getState().chats.chatsList
    for(let i = 0; i < chatList.length; i++)
    {
        let chat = chatList[i]
        if(chat.chatId === chatId)
        {
            offsetChats = i;
            offsetMessages = chat.messages.length
            break;
        }
    }

    return function(dispatch) {
        getMessagesApi(offsetChats, offsetMessages).then(res => {
            if(res.ok && res.messages.length !== 0)
                dispatch(
                    addMessagesBeforeOld(chatId, res.messages)
                )
        })
    }
}