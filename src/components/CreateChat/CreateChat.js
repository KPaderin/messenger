import React, { useState } from "react"
import styles from './CreateChat.module.css';
import plusIcon from '../ChatMenu/newChatIcon.svg';
import { ModalWindow } from '../common/ModalWindow/ModalWindow'
import SelectArea from '../SelectArea/SelectArea'
import { createChat } from '../../api/chats'
import MembersInput from '../MembersInput/MembersInput'
import SubmitButton from "../SubmitButton/SubmitButton";

const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}

export const CreateChat = ( {creatingChat, setCreatingChat} ) => {
    const [members, setMembers] = useState([])
    const [nameChat, setNameChat] = useState("")
    const [typeChat, setTypeChat] = useState("CHANNEL")

    const createChatHandler = (e) => {
        e.preventDefault()
        createChat(nameChat, typeChat, members)
    }

    return (
        <ModalWindow isOpen={creatingChat} onRequestClose={() => setCreatingChat(false)}>
            <div
                onClick={() => setCreatingChat(false)}
                className={styles.btnCloseModal}>
                <img alt={"Close"} src={plusIcon} />
            </div>
            <b className={styles.titleModal}>Создание чата</b>
            <form className={styles.createChatForm}>
                <input
                required
                placeholder={"Название"}
                typeInput={"text"}
                className={styles.input__my_input}
                onChange={e => setNameChat(e.target.value)}
                />
                <SelectArea
                    required={true}
                    options={OPTIONS}
                    onChange={ e => setTypeChat(e.target.value) }
                />
                <MembersInput
                    members={members}
                    setMembers={setMembers}
                />

                <SubmitButton className={styles.my__button} onClick={ e => {
                    createChatHandler(e)
                    setCreatingChat(false) }}>Создать</SubmitButton>
            </form>
        </ModalWindow>
    )
}
