import React, {useCallback} from 'react';
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import styles from "../CreateChat/CreateChat.module.css";
import plusIcon from "../../images/plusIcon.svg";

const UserProfile = ({isActive, changeActive}) => {
    const closeModalHandler = useCallback(() => {
        changeActive();
    },[changeActive])

    return (
            <ModalWindow isOpen={isActive} onRequestClose={closeModalHandler}>
                <div
                    onClick={closeModalHandler}
                    className={styles.btnCloseModal}>
                    <img alt={"Close"} src={plusIcon} />
                </div>
                <b className={styles.titleModal}>Создание чата</b>
                <form className={styles.createChatForm}>
                </form>
            </ModalWindow>
    );
};

export default React.memo(UserProfile);