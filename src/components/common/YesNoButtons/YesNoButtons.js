import React from 'react';
import SubmitButton from "../../SubmitButton/SubmitButton";
import styles from './YesNoButtons.module.css';

const YesNoButtons = ({yesText, noText, yesClick, noClick}) => {
    return (
        <div className={styles.row_wrap}>
            <SubmitButton onClick={yesClick}>{yesText}</SubmitButton>
            <div className={styles.centerEmptyWrap}/>
            <SubmitButton
                onClick={noClick}
                filledBackground={false}
            >{noText}</SubmitButton>
        </div>
    );
};

export default YesNoButtons;