import {initStoreFromApi} from "./initStoreFromApi";

const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'
export const authorization = function (login, password, isAuth, setIsAuth) {
    if(isAuth)
        return;
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
                    query{
                      signIn(
                        login: ` + login +
                `password: ` + password + `
                      )
                    }`
        })
    }).then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty("errors"))
                alert("Произошла ошибка :(")
            else {
                setIsAuth(true);
                localStorage.setItem('auth', json.data.signIn);
                localStorage.setItem('login', login);
                initStoreFromApi();
            }
        })
}

export const register = function(login, password, name, isAuth, setIsAuth) {
    if(isAuth)
        return;
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
                    mutation{
                      register(
                        login:` + login +
                `password:` + password +
                `name:` + name + `
                      ) {
                        image
                      }
                    }`
        })
    }).then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty("errors"))
                alert("Произошла ошибка :(")
            else {
                setIsAuth(true);
                authorization(login, password, setIsAuth);
                alert("Добро пожаловать)")
            }
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