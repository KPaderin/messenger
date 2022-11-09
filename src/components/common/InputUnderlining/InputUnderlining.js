import React from 'react';
import styles from './InputUnderlining.module.css';

const InputUnderlining = (props) => {
    return (
        <input
        required
        className={styles.input__my_input}
        {...props}
        />
    );
};

export default InputUnderlining;