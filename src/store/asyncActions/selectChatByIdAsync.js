import {selectChatById} from "../actionCreators/selectChatById";

export const selectChatByIdAsync = (chatId) => {
    return function(dispatch){
        localStorage.setItem('chatId', chatId)
        dispatch(selectChatById(chatId))
    }
}