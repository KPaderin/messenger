import { combineReducers } from 'redux'
import chatsReducer from "./chatsReducer";

const rootReducer = combineReducers({
    chats: chatsReducer,
})

export default rootReducer;