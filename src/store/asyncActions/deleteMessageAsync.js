import {deleteMessage} from "../actionCreators/deleteMessage";
import {deleteMessageApi} from "../../services/serviceMessage";

export const deleteMessageAsync = (chatId, messageId) => {
    return function(dispatch){
        deleteMessageApi(chatId, messageId).then(res => {
            if(res.deleteMessage === true)
            {
                dispatch(deleteMessage(chatId, messageId))
            }
        })
    }
}