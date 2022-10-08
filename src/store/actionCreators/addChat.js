import addChatAction from "../actions/addChatAction";

export const addChat =(
    ownerLogin,
    messages,
    members,
    chatId,
    chatType,
    chatName,
    chatImage
    ) => {
    return {
        type: addChatAction,
        payload: {
            'ownerLogin': ownerLogin,
            'messages': messages,
            'members': members,
            'chatId': chatId,
            'chatType': chatType,
            'chatName': chatName,
            'chatImage': chatImage
        },
    }
}