import {initStoreFromApi} from "./initStoreFromApi";

const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'
export const authorization = function (userData, setIsAuth) {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
                    query{
                      signIn(
                        login: "` + userData.login + `"
                password: "` + userData.password + `"
                      )
                    }`
        })
    }).then(res => res.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.ok = false;
                alert("Произошла ошибка :(")
            }
            else {
                setIsAuth(true);
                localStorage.setItem('auth', json.data.signIn);
                localStorage.setItem('login', userData.login);
                initStoreFromApi();
            }
            return status
        })
}

export const register = function(userData, isAuth, setIsAuth) {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
                    mutation{
                      register(
                        login: "` + userData.login + `"
                password: "` + userData.password + `"
                name: "` + userData.name + `"
                      ) {
                        image
                      }
                    }`
        })
    }).then(res => res.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")){
                status.ok = false;
                alert("Произошла ошибка :(")
            }
            else {
                setIsAuth(true);
                authorization(userData, setIsAuth);
                alert("Добро пожаловать)")
            }
            return status
        })
}

export const deauthorization = function(e, isAuth, setIsAuth)
{
    if(isAuth === true)
        setIsAuth(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('login');
    localStorage.removeItem('chatId')
}