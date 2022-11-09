import selectChatByIdAction from "../actions/selectChatByIdAction";

export const selectChatById =(
    selectChatId
) => {
    return {
        type: selectChatByIdAction,
        payload: selectChatId,
    }
}