export const updateUserData = (prom, setIsAuth) => {
    prom.then(res => {
        if(res.ok) {
            localStorage.setItem('auth', res.auth);
            localStorage.setItem('login', res.login);
            setIsAuth(true);
        }
    })
}