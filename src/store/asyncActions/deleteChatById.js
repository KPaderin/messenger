import {deleteChat as deleteChatApi} from "../../services/deleteChat";
import {deleteChat} from "../actionCreators/deleteChat"
import {selectChatId} from "../actionCreators/selectChatId";

export const deleteChatById = (id) => {
    return function(dispatch){
        deleteChatApi(id).then(res => {
            if(res === true)
            {
                dispatch(deleteChat(id))
                dispatch(selectChatId('spam'))
                localStorage.setItem('chatId', 'spam')
            }
        })
    }
}