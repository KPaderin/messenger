import updateUserAction from "../actions/updateUserAction";

export const updateUser =(
    userImage
) => {
    return {
        type: updateUserAction,
        payload: {
            'chatImage': userImage
        },
    }
}