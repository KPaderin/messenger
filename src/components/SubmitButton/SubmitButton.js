import React from 'react';
import styles from './SubmitButton.module.css'
import classNames from "classnames";

const SubmitButton = ({
    onClick,
    children,
    filledBackground
    }) => {
    const changeableClass = classNames({
        [styles.my__button]: true,
        [styles.filledBackground]: (filledBackground === undefined) || filledBackground === true
    });
    
    return (
        <button onClick={onClick} className={changeableClass}>
            {children}
        </button>
    );
};

export default SubmitButton;