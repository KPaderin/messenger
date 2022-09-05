import React, {useContext} from 'react';
import logo from '../../svg-2.svg';
import styles from './HeaderTitle.module.css';
import {AuthContext} from '../../context/index';
import {deauthorization} from "../../api/authAndReg";

export function HeaderTitle() {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        <header className={styles.header}>
            <img alt="logo" src={logo} className={styles.header__logo}/>
            {'Killogram'}
            <button onClick={(e) => deauthorization(e, isAuth, setIsAuth)} className={styles.button__out}>Выйти</button>
        </header>
    );
}

export default HeaderTitle
