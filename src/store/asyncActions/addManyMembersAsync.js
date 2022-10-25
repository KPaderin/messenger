import {inviteUserApi} from "../../services/chats";
import {addManyMembers} from "../actionCreators/addManyMembers";

export const addManyMemberAsync = (chatId, users) => {
    return function(dispatch){
        Promise.all( users.map(user => {
            return inviteUserApi(chatId, user)
            })
        ).then(res => {
            let usersArray = []
            res.forEach(user => {
                if(user.ok === true)
                    usersArray.push({image:user.image, login:user.login, name:user.name})
            })
            dispatch(addManyMembers(chatId, usersArray))
        })
    }
}