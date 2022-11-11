import React from 'react';
import styles from './InputArea.module.css'

const InputArea = (props) => {
    return (
        <input required
               className={styles.input_myInput}
               type={props.type || "text"}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.onChange}>
        </input>
    );
};

export default React.memo(InputArea);
