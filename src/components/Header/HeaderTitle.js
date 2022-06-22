import React, {useContext} from 'react';
import logo from '../../svg-2.svg';
import styles from './Header.module.css';
import {AuthContext} from '../../context/index';

export function HeaderTitle() {
    // eslint-disable-next-line
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const deauthorization = function(e)
    {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }
    return (
        <header className="main-window__header header">
            <img alt="logo" src={logo} className="header__logo"/>
            {'Killogram'}
            <button onClick={deauthorization} className={styles.button__out}>Выйти</button>
        </header>
    );
}


export default HeaderTitle
