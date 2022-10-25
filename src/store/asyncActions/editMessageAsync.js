import {editMessageApi} from "../../services/editMessageApi";
import {editMessage} from "../actionCreators/editMessage";

export const editMessageAsync = (chatId, messageId, messageText) => {
    return function(dispatch){
        editMessageApi(chatId, messageId, messageText).then(res => {
            if(res.ok)
            {
                dispatch(editMessage(chatId, messageId, res.editedMessage))
            }
        })
    }
}