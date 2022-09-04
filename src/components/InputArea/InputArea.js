import React from 'react';
import styles from './InputArea.module.css'

const InputArea = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} required
               type={props.placeholderText === "Пароль" ? "password" : "text"}
               placeholder={props.placeholderText}
               className={styles.input__my_input}>
        </input>
    );
});

export default InputArea;
