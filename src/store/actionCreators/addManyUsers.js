import addManyUsersAction from "../actions/addManyUsersAction";

export const addManyUsers = (
    usersList
) => {
    return {
        type: addManyUsersAction,
        payload: usersList,
    }
}