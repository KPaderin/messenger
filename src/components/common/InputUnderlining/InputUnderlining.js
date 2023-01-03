import React from 'react';
import styles from './InputUnderlining.module.css';

const InputUnderlining = (props) => {
    return (
        <input
        required
        className={styles.input_myInput}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        />
    );
};

export default InputUnderlining;