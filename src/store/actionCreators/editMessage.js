import editMessageAction from "../actions/editMessageAction";

export const editMessage =(
    chatId,
    messageId,
    editedMessage
) => {
    return {
        type: editMessageAction,
        payload: {
            'chatId': chatId,
            'messageId': messageId,
            'editedMessage': editedMessage
        },
    }
}