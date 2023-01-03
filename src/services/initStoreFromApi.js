import {getChatsList} from "./getChatsList";
import {addManyChats} from "../store/actionCreators/addManyChats";
import {selectChatById} from '../store/actionCreators/selectChatById';
import store from "../store/store";
import {getAllUsers} from "./users";
import {addManyUsers} from "../store/actionCreators/addManyUsers";

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
        if(localStorage.getItem('chatId'))
            Store.dispatch(selectChatById(localStorage.getItem('chatId')))
    });
    getAllUsers().then((data) => {
        let usersList = data.users.map((item) => {
                return {name: item.login, login:item.login, id:item.login}
        })
        Store.dispatch(addManyUsers(usersList))
    });
}