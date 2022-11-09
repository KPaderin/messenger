import { combineReducers } from 'redux'
import chatsReducer from "./chatsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
    chats: chatsReducer,
    users: usersReducer,
})

export default rootReducer;