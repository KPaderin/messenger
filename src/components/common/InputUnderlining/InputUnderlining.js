import React from 'react';
import styles from './InputUnderlining.module.css';

const InputUnderlining = ({placeholderText, textValue, setTextValue}) => {
    return (
        <input
        required
        placeholder={placeholderText}
        className={styles.input__my_input}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
    />
    );
};

export default InputUnderlining;