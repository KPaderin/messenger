import addManyChatsAction from "../actions/addManyChatsAction";

export const addManyChats = (
    chatsList
) => {
    return {
        type: addManyChatsAction,
        payload: chatsList,
    }
}