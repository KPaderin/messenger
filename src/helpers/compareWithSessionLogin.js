export const compareWithSessionLogin = (login) => {
    return localStorage.getItem('login') && login === localStorage.getItem('login').replaceAll("\"", "");
};