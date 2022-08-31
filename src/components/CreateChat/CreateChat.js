import React, {useEffect, useState} from "react"
import styles from './CreateChat.module.css';
import newChatIcon from '../ChatMenu/newChatIcon.svg';
import { ModalWindow } from '../common/ModalWindow/ModalWindow'
import InputArea from '../NewInputArea/InputArea'
import SelectArea from '../SelectArea/SelectArea'
import { createChat } from '../../api/chats'
import MembersInput from '../MembersInput/MembersInput'

const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}


export const CreateChat = ( {creatingChat, setCreatingChat} ) => {
    const [members, setMembers] = useState([])
    const [nameChat, setNameChat] = useState("")
    const [typeChat, setTypeChat] = useState("CHANNEL")

    useEffect(() => {
        if(localStorage.getItem('login'))
            setMembers([localStorage.getItem('login').replaceAll("\"", "")]);
        else
            setMembers([]);
    }, []);

    const createChatHandler = (e) => {
        e.preventDefault()

        createChat(nameChat, typeChat, members)
    }

    return (
        <ModalWindow isOpen={creatingChat} onRequestClose={() => setCreatingChat(false)}>
            <div
                onClick={() => setCreatingChat(false)}
                className={styles.btnCloseModal}>
                <img alt={"Close"} src={newChatIcon} />
            </div>
            <b className={styles.titleModal}>Создание чата</b>
            <form className={styles.createChatForm}>
                <InputArea
                    placeholderText={"Название"}
                    typeInput={"text"}
                    onChange={ e => setNameChat(e.target.value) }
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

                <button className={styles.my__button} onClick={ e => createChatHandler(e)}>Создать</button>
            </form>
        </ModalWindow>
    )
}
