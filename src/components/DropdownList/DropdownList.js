import React from 'react';
import styles from './DropdownList.module.css'

const DropdownList = ({ required, options , onChange}) => {

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

export default DropdownList;
