import React, {useContext} from 'react';
import logo from '../../images/logo.svg';
import styles from './HeaderTitle.module.css';
import {AuthContext} from '../../context/index';
import {logout} from "../../services/logout";

export function HeaderTitle() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        <header className={styles.header}>
            <img alt="logo" src={logo} className={styles.header__logo}/>
            {'Killogram'}
            <button onClick={(e) => logout(e, isAuth, setIsAuth)} className={styles.button__out}>Выйти</button>
        </header>
    );
}

export default HeaderTitle
