import addMessageAction from "../actions/addMessageAction";

export const addMessage =(
    chatId,
    sentMessage
) => {
    return {
        type: addMessageAction,
        payload: {
            'chatId': chatId,
            'sentMessage': sentMessage
        },
    }
}