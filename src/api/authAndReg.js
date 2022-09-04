const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'
export const authorization = function (login, password, setIsAuth) {
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
            }
        })
}

export const register = function(login, password, name, setIsAuth) {
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

export const deauthorization = function(e, setIsAuth)
{
    setIsAuth(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('login');
}