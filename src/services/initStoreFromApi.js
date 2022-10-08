import {getChatsList} from "./getChatsList";
import {addManyChats} from "../store/actionCreators/addManyChats";
import {selectChatId} from '../store/actionCreators/selectChatId';
import store from "../store/store";

const Store = store;

export const initStoreFromApi = function() {
    getChatsList().then(res => {console.log(res)});
    getChatsList().then(arr => {
        let chatsList = arr.map(chat => {
                return {
                    'ownerLogin': chat.owner.login,
                    'messages': chat.messages,
                    'chatMembers': chat.members,
                    'chatId': chat.id,
                    'chatType': chat.type,
                    'chatName': chat.name,
                    'chatImage': chat.image
                }
        })
        Store.dispatch(addManyChats(chatsList))
    });
    if(localStorage.getItem('chatId'))
        Store.dispatch(selectChatId(localStorage.getItem('chatId')))
}