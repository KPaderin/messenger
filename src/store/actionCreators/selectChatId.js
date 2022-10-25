import selectChatIdAction from "../actions/selectChatIdAction";

export const selectChatId =(
    selectChatId
) => {
    return {
        type: selectChatIdAction,
        payload: selectChatId,
    }
}