import React from 'react';
import styles from './SelectArea.module.css'

const SelectArea = ({ required, options , onChange}) => {

    return (
        <select
            required={required}
            className={styles.customSelector}
            onChange={onChange}
        >
            {Object.keys(options).map( key => (
                <option key={key} value={key}>{options[key]}</option>
            ))}
        </select>
    )
}

export default SelectArea;
