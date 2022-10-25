import { useEffect, useState } from 'react';
import React from 'react';
import Main from '../MainPage/Main';
import EntryForm from '../EntryForm/EntryForm';
import {AuthContext} from '../../context/index';
import '../../main.css';
import {initStoreFromApi} from "../../services/initStoreFromApi";

export function App() {
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuth(true);
            initStoreFromApi();
        }
        else{
            setIsAuth(false);
        }
    }, []);

    return (
      <div>
          <AuthContext.Provider value={{
            isAuth,
            setIsAuth
          }}>
            {!isAuth ? <EntryForm/> : null}
              {isAuth ? <Main /> : null}
          </AuthContext.Provider>
      </div>
    );
}
