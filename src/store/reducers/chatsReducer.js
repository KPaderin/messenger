import initialState from '../initialState';
import addChatAction from "../actions/addChatAction";

export default function chatsReducer(state = initialState.chats, action) {
    switch(action.type) {
        case addChatAction: {
            return {
                ...state,
                chatsList: [...state.chatsList, action.payload]
            }
        }

        default: return state;
    }
}