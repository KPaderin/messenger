import React, {useEffect, useState} from 'react';
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import styles from './ChatUpdate.module.css';
import InputUnderlining from "../common/InputUnderlining/InputUnderlining";
import CheckableBoxItem from "../common/CheckableBoxItem/CheckableBoxItem";
import YesNoButtons from "../common/YesNoButtons/YesNoButtons";
import plusIcon from "../../icons/plusIcon.svg";
import {useDispatch} from "react-redux";
import {updateChatAsync} from "../../store/asyncActions/updateChatAsync";

const ChatUpdate = ({chatName, isDefaultImage, chatId, isActive, setIsActive}) => {
    const [useDefaultImage, setUseDefaultImage] = useState(false)
    const [currentValue, setCurrentValue] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentValue(chatName);
        setUseDefaultImage(isDefaultImage);
    }, [isActive])

    const handleUpdateChat = function(e) {
        e.preventDefault();
        dispatch(updateChatAsync(chatId, currentValue, useDefaultImage));
        setIsActive(false);
    }
    return (
        <ModalWindow isOpen={isActive} onRequestClose={() => setIsActive(false)}>
            <form className={styles.editChatForm}>
                <img className={styles.btnCloseModal} alt={"CloseMembersList"} src={plusIcon}
                     onClick={() => {setIsActive(false)}}/>
                <b className={styles.titleModal}>Редактирование</b>
                <InputUnderlining
                    placeholderText={chatName}
                    textValue={currentValue}
                    setTextValue={setCurrentValue}
                />
                <CheckableBoxItem
                    text={"Использовать дефолтную аватарку?"}
                    isCheck={useDefaultImage}
                    setIsCheck={setUseDefaultImage}
                />
                <YesNoButtons
                    yesText={"Сохранить"}
                    noText={"Отменить"}
                    yesClick={(e) => handleUpdateChat(e)}
                    noClick={() => setIsActive(false)}
                />
            </form>
        </ModalWindow>

    );
};

export default ChatUpdate;