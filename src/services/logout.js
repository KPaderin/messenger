import store from "../store/store";
import {userLogout} from "../store/actionCreators/userLogout";

const Store = store;

export const logout = function(setIsAuth)
{
    Store.dispatch(userLogout())
    localStorage.removeItem('auth');
    localStorage.removeItem('login');
    localStorage.removeItem('chatId')
    setIsAuth(false)
}