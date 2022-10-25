import kickUserAction from "../actions/kickUserAction";

export const kickUser =(
    chatId,
    userLogin
) => {
    return {
        type: kickUserAction,
        payload: {
            'chatId': chatId,
            'login': userLogin
        },
    }
}