import {kickUserApi} from "../../services/chats";
import {kickUser} from "../actionCreators/kickUser";

export const kickUserAsync = (chatId, userLogin) => {
    return function(dispatch){
        kickUserApi(chatId, userLogin).then(res => {
           if(res.ok)
                dispatch(kickUser(chatId, userLogin))
        })
    }
}