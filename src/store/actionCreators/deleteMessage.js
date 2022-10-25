import deleteMessageAction from "../actions/deleteMessageAction";

export const deleteMessage =(
    chatId,
    messageId
) => {
    return {
        type: deleteMessageAction,
        payload: {
            'chatId': chatId,
            'messageId': messageId
        },
    }
}