import initialState from "../initialState";
import addChatAction from "../actions/addChatAction";
import userLogoutAction from "../actions/userLogoutAction";
import selectChatByIdAction from "../actions/selectChatByIdAction";
import addManyChatsAction from "../actions/addManyChatsAction";
import deleteChatAction from "../actions/deleteChatAction";
import deleteMessageAction from "../actions/deleteMessageAction";
import addMessageAction from "../actions/addMessageAction";
import editMessageAction from "../actions/editMessageAction";
import updateChatAction from "../actions/updateChatAction";
import kickUserAction from "../actions/kickUserAction";
import addManyMembersAction from "../actions/addManyMembersAction";

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
        case selectChatByIdAction: {
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
        case deleteChatAction: {
            return {
                ...state,
                chatsList: state.chatsList.filter(item => item.chatId !== action.payload)
            }
        }
        case deleteMessageAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, messages: chat.messages.filter(message => message.id !== action.payload.messageId)}
                    return chat
                })
            }
        }
        case addMessageAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, messages: [action.payload.sentMessage, ...chat.messages]}
                    return chat
                })
            }
        }
        case editMessageAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, messages: chat.messages.map(message => {
                            if(message.id === action.payload.messageId) {
                                return action.payload.editedMessage
                            }
                            return message
                        })}
                    return chat
                })
            }
        }
        case updateChatAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, chatName: action.payload.chatName, chatImage: action.payload.chatImage}
                    return chat
                })
            }
        }
        case kickUserAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, chatMembers: chat.chatMembers.filter(member => member.login !== action.payload.login)}
                    return chat
                })
            }
        }
        case addManyMembersAction: {
            return {
                ...state,
                chatsList: state.chatsList.map(chat => {
                    if(chat.chatId === action.payload.chatId)
                        return {...chat, chatMembers: chat.chatMembers.concat(action.payload.users)}
                    return chat
                })
            }
        }
        default: return state;
    }
}