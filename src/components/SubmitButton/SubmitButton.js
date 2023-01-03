import React from 'react';
import styles from './SubmitButton.module.css'
import classNames from "classnames";

const SubmitButton = (props) => {

    const changeableClass = classNames({
        [styles.my__button]: true,
        [styles.filledBackground]: (props.filledBackground === undefined) || props.filledBackground === true
    });
    
    return (
        <button onClick={props.onClick} className={changeableClass} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default SubmitButton;