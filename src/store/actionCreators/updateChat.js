import updateChatAction from "../actions/updateChatAction";

export const updateChat =(
    chatId,
    chatName,
    chatImage
) => {
    return {
        type: updateChatAction,
        payload: {
            'chatId': chatId,
            'chatName': chatName,
            'chatImage': chatImage
        },
    }
}