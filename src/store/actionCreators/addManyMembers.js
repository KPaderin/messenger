import addManyMembersAction from "../actions/addManyMembersAction";

export const addManyMembers =(
    chatId,
    users
) => {
    return {
        type: addManyMembersAction,
        payload: {
            'chatId': chatId,
            'users': users
        },
    }
}