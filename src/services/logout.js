import {deauthorization} from "./authAndReg";
import store from "../store/store";
import {userLogout} from "../store/actionCreators/userLogout";
const Store = store;
export const logout = function(e, isAuth, setIsAuth)
{
    deauthorization(e, isAuth, setIsAuth)
    Store.dispatch(userLogout())
}