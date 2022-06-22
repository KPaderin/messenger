import { useEffect, useState } from 'react';
import Main from '../MainPage/Main';
import EntryForm from '../EntryForm/EntryForm';
import {AuthContext} from '../../context/index';
import '../../main.css';

export function App() {
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuth(true);
        }
        else
            setIsAuth(false);
    }, []);

    return (
      <div>
          <AuthContext.Provider value={{
            isAuth,
            setIsAuth
          }}>
            {!isAuth ? <EntryForm/> : null}
            <Main />
          </AuthContext.Provider>
      </div>
    );
}
