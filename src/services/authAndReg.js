import {initStoreFromApi} from "./initStoreFromApi";
import {URL} from "../consts/url"
export const authorization = function (userData) {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `query SignIn($login: String!, $password: String!) {
                        signIn(login: $login, password: $password)
                }`,
            variables: {login: userData.login, password: userData.password}
        })
    }).then(res => res.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ");
                status.ok = false;
                alert(status.errorsMessage);
            }
            if(json.hasOwnProperty("data")) {
                status.auth = json.data.signIn;
                status.login = userData.login;
                initStoreFromApi();
            }
            return status
        })
}

export const register = function(userData, setIsAuth) {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `mutation Register($login: String!, $password: String!, $name: String!) {
                        register(login: $login, password: $password, name: $name) { image }
                }`,
            variables: {login: userData.login, password: userData.password, name:userData.name}
        })
    }).then(res => res.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
                alert(status.errorsMessage);
            }
            if(json.hasOwnProperty("data")) {
                authorization(userData, setIsAuth);
                alert("Добро пожаловать)")
            }
            return status
        })
}