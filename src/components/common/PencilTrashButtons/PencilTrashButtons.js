import React from 'react';
import styles from "./PencilTrashButtons.module.css";
import pencilImg from "../../../images/pencil.svg";
import trashImg from "../../../images/trash.svg";

const PencilTrashButtons = ({pencilOnClick, trashOnClick}) => {
    return (
        <>
            <img onClick={pencilOnClick} className={styles.button__edit__img} alt="editMessage" src={pencilImg}/>
            <img onClick={trashOnClick} className={styles.button__delete__img} alt="deleteMessage" src={trashImg}/>
        </>
    );
};

export default React.memo(PencilTrashButtons);