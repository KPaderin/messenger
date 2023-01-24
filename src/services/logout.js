import store from "../store/store";
import {userLogout} from "../store/actionCreators/userLogout";

export const logout = function(setIsAuth)
{
    localStorage.removeItem('auth');
    localStorage.removeItem('login');
    localStorage.removeItem('chatId')
    store.dispatch(userLogout())
    setIsAuth(false)
}