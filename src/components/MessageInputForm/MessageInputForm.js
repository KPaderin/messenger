import React from 'react';
import styles from "./MessageInputForm.module.css";
import SideWrap from "../common/wraps/rowDividedWrap/SideWrap";
import CenterWrap from "../common/wraps/rowDividedWrap/CenterWrap";
import useResizeTextArea from "../../hooks/useResizeTextarea";

const MessageInputForm = ({handleSendMessage}) => {
    const messageText = useResizeTextArea()

    const handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        handleSendMessage(messageText.value)
        console.log(messageText.ref.current.innerHTML);
        messageText.ref.current.value = "";
        messageText.onChange({target:{value:""}});
    }

    return (
        <div className={styles.chat__input__area}>
            <SideWrap />
            <CenterWrap>
                    <textarea
                        className={styles.text__area}
                        rows={1}
                        placeholder={"Введите сообщение..."}
                        {...messageText}
                        spellCheck={'false'}
                    />
                <button
                    onClick={handleSubmit}
                    className={styles.button__send}
                >Отправить</button>
            </CenterWrap>
            <SideWrap />
        </div>
    );
};

export default React.memo(MessageInputForm);