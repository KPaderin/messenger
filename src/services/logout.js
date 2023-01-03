export const logout = function(setIsAuth)
{
    localStorage.removeItem('auth');
    localStorage.removeItem('login');
    localStorage.removeItem('chatId')
    setIsAuth(false)
}