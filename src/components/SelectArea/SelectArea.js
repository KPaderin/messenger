import React from 'react';
import styles from './SelectArea.module.css'

const SelectArea = ({ required, options }) => {

    return (
        <select
            required={required}
            className={styles.customSelector}
        >
            {Object.keys(options).map( key => (
                <option value={key}>{options[key]}</option>
            ))}
        </select>
    )
}

export default SelectArea;
