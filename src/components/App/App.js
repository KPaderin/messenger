import { useEffect, useState } from 'react';
import React from 'react';
import Main from '../MainPage/Main';
import Login from '../../pages/EntryForm/Login';
import {AuthContext} from '../../context/index';
import '../../main.css';
import {initStoreFromApi} from "../../services/initStoreFromApi";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

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

    const loginPage = () => {
        if(isAuth === true)
            return <Navigate replace to={"/chat"} />;
        return <Login />
    }

    const chatPage = () => {
        if(isAuth === false)
            return <Navigate replace to={"/login"} />;
        return <Main />
    }

    return (
      <div>
          <AuthContext.Provider value={{
            isAuth,
            setIsAuth
          }}>
              <BrowserRouter>
                  <Routes>
                      <Route path={"/login"} element={loginPage()} />
                      <Route path={"/chat"} element={chatPage()} />
                      <Route path={"/"} element={<Navigate replace to={"/login"} />} />
                  </Routes>
              </BrowserRouter>
          </AuthContext.Provider>
      </div>
    );
}

export default App;

