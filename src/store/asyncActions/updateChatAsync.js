import {updateChatImageApi} from "../../services/chats";
import {updateChatNameApi} from "../../services/chats";
import {avatarLooksLikeGithub} from "../../images/avatarLooksLikeGithub/avatarLooksLikeGithub";
import {updateChat} from "../actionCreators/updateChat";

export const updateChatAsync = (chatId, chatName, isDefaultImage) => {
    return function(dispatch){
        let chatImage = "null";
        if(isDefaultImage === true) {
            let ava = new avatarLooksLikeGithub(chatName);
            chatImage = ava.getMatrix().getSvgBase64();
        }
        updateChatImageApi(chatId, chatImage).then(res => {
            if(res.ok)
                dispatch(updateChat(chatId, chatName, chatImage))
        })
        updateChatNameApi(chatId, chatName).then(res => {
            if(res.ok)
                dispatch(updateChat(chatId,chatName, chatImage))
        })
    }
}