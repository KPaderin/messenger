import React, {useEffect, useState} from "react";
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import styles from "./ChatUpdate.module.css";
import InputUnderlining from "../common/InputUnderlining/InputUnderlining";
import CheckableBoxItem from "../common/CheckableBoxItem/CheckableBoxItem";
import YesNoButtons from "../common/YesNoButtons/YesNoButtons";
import plusIcon from "../../icons/plusIcon.svg";
import {useDispatch} from "react-redux";
import {updateChatAsync} from "../../store/asyncActions/updateChatAsync";

const ChatUpdate = ({chatName, isDefaultImage, chatId, isActive, changeActive}) => {
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
        changeActive();
    }

    const handleHideUpdateChat = function() {
        changeActive()
    }
    return (
        <ModalWindow isOpen={isActive} onRequestClose={() => changeActive()}>
            <form className={styles.editChatForm}>
                <img className={styles.btnCloseModal} alt={"CloseMembersList"} src={plusIcon}
                     onClick={() => {changeActive()}}/>
                <b className={styles.titleModal}>Редактирование</b>
                <InputUnderlining
                    placeholder={chatName}
                    value={currentValue}
                    onChange={e => setCurrentValue(e.target.value)}
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
                    noClick={(e) => handleHideUpdateChat(e)}
                />
            </form>
        </ModalWindow>

    );
};

export default ChatUpdate;