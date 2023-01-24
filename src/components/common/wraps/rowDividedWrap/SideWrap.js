import React from 'react';
import styles from "./rowDividedWrap.module.css";

const SideWrap = ({children, className}) => {
    return (
        <div className={styles.side__wrap + ' ' + className}>
            {children}
        </div>
    );
};

export default React.memo(SideWrap);