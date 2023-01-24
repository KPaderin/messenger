import addMessagesBeforeOldAction from "../actions/addMessagesBeforeOld";

export const addMessagesBeforeOld =(
    chatId,
    messages
) => {
    return {
        type: addMessagesBeforeOldAction,
        payload: {
            'messages': messages,
            'chatId': chatId
        },
    }
}