import initialState from "../initialState";
import addManyUsersAction from "../actions/addManyUsersAction";

export default function usersReducer(state = initialState.users, action) {
    switch(action.type) {
        case addManyUsersAction: {
            return {
                ...state,
                usersList: state.usersList.concat(action.payload)
            }
        }
        default: return state;
    }
}