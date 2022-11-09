import React from 'react';
import styles from "./rowDividedWrap.module.css";

const CenterWrap = ({children, className}) => {
    return (
        <div className={styles.center__wrap + ' ' + className}>
            {children}
        </div>
    );
};

export default CenterWrap;