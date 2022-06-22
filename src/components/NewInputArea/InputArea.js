import React from 'react';
import styles from './InputArea.module.css'

const InputArea = ({ placeholderText, typeInput }) => {

    return (
        <input
            required
            type={typeInput}
            placeholder={placeholderText}
            className={styles.input__my_input}
        ></input>
    )
}

export default InputArea;
