import addChatAction from "../actions/addChatAction";

export const addChat =(
    createdBy,
    messages,
    chatID,
    chatType,
    chatName,
    chatLogo
    ) => {
    return {
        type: addChatAction,
        payload: {
            'createdBy': createdBy,
            'messages': messages,
            'chatID': chatID,
            'chatType': chatType,
            'chatName': chatName,
            'chatLogo': chatLogo
        },
    }
}