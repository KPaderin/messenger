import deleteChatAction from "../actions/deleteChatAction";

export const deleteChat = (
    chatId
) => {
    return {
        type: deleteChatAction,
        payload: chatId,
    }
}