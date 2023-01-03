import {createSelector} from "reselect";
import initialState from "./initialState";

export const chatsListSelector = state => state.chats.chatsList

export const selectedChatId = state => state.chats.selectedChatId

export const usersListSelector = createSelector(
    state => state.users.usersList,
    user => user
)

export const selectedChatSelector = createSelector(
    [selectedChatId, chatsListSelector],
    (id, chats) => {
        let response = initialState.chats.newChat
        chats.forEach(chat => {
            if(chat.chatId === id)
                response = chat
        })
        return response
    }
)
