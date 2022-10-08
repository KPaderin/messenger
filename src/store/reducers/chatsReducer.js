import initialState from "../initialState";
import addChatAction from "../actions/addChatAction";
import userLogoutAction from "../actions/userLogoutAction";
import selectChatIdAction from "../actions/selectChatIdAction";
import addManyChatsAction from "../actions/addManyChatsAction";

export default function chatsReducer(state = initialState.chats, action) {
    switch(action.type) {
        case addChatAction: {
            return {
                ...state,
                chatsList: [...state.chatsList, action.payload]
            }
        }
        case userLogoutAction: {
            return {
                ...state,
                chats: initialState.chats
            }
        }
        case selectChatIdAction: {
            return {
                ...state,
                selectedChatId: action.payload
            }
        }
        case addManyChatsAction: {
            return {
                ...state,
                chatsList: state.chatsList.concat(action.payload)
            }
        }
        default: return state;
    }
}