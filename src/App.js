import { useEffect, useState } from 'react';
import React from 'react';
import Main from './pages/MainPage/Main';
import Login from './pages/Login/Login';
import {AuthContext} from './context';
import './main.css';
import {initStoreFromApi} from "./services/initStoreFromApi";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

export function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('auth')){
            setIsAuth(true);
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

    const mainPage = () => {
        if(isAuth === false)
            return <Navigate replace to={"/login"} />;
        initStoreFromApi();
        return <Main />
    }

    return (
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
          <BrowserRouter>
              <Routes>
                  <Route path={"/login"} element={loginPage()} />
                  <Route path={"/chat"} element={mainPage()} />
                  <Route path={"/"} element={<Navigate replace to={"/login"} />} />
              </Routes>
          </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;

