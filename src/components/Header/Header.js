import React, {useContext} from 'react';
import logo from '../../images/logo.svg';
import styles from './Header.module.css';
import {logout} from "../../services/logout";
import {AuthContext} from "../../context";

export function Header() {
    const {setIsAuth} = useContext(AuthContext);

    const handleLogout = (e) => {
        e.stopPropagation();
        logout(setIsAuth);
    }

    return (
        <header className={styles.header}>
            <img alt="logo" src={logo} className={styles.header__logo}/>
            {"Kilogram"}
            <button onClick={handleLogout} className={styles.buttonOut}>Выйти</button>
        </header>
    );
}

export default Header
