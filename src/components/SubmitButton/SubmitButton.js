import React from 'react';
import styles from './SubmitButton.module.css'
const SubmitButton = ({
    onClick,
    children }) => {
    return (
        <button onClick={onClick} className={styles.my__button}>
            {children}
        </button>
    );
};

export default SubmitButton;