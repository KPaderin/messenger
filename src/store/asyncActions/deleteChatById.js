import {deleteChatApi} from "../../services/deleteChat";
import {deleteChat} from "../actionCreators/deleteChat"
import {selectChatById} from "../actionCreators/selectChatById";

export const deleteChatById = (id) => {
    return function(dispatch){
        deleteChatApi(id).then(res => {
            if(res === true)
            {
                dispatch(deleteChat(id))
                dispatch(selectChatById('spam'))
                localStorage.setItem('chatId', 'spam')
            }
        })
    }
}