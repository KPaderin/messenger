import {sendMessageApi} from "../../services/sendMessages";
import {addMessage} from "../actionCreators/addMessage";

export const sendMessageAsync = (chatId, messageText) => {
    return function(dispatch){
        sendMessageApi(chatId, messageText).then(res => {
            if(res.ok)
            {
                dispatch(addMessage(chatId, res.sentMessage))
            }
        })
    }
}