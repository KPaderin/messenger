import {createChatAndGetStatusApi} from "../../services/chats";
import {addChat} from "../actionCreators/addChat";

export const createChatAsync = (chatName, chatType, selectedMembers) => {
    return function(dispatch) {
        createChatAndGetStatusApi(chatName, chatType, selectedMembers.map(member => member.login)).then(res => {
           if(res.ok)
               dispatch(
                   addChat(res.ownerLogin, [], selectedMembers, res.id, chatType, chatName, null)
               )
        })
    }
}