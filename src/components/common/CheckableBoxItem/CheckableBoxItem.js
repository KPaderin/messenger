import React from 'react';
import styles from './CheckableBoxItem.module.css';

const CheckableBoxItem = ({text, isCheck, setIsCheck}) => {
    return (
        <div className={styles.row_wrap}>
            <p
                className={styles.option_text}>
                {text}
            </p>
            <input
                className={styles.input_checkbox}
                defaultChecked={isCheck}
                onChange={e => setIsCheck(e.target.checked)}
                type={"checkbox"}
            />
        </div>
    );
};

export default CheckableBoxItem;