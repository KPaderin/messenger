import React, { useEffect, useState } from "react"
import styles from './CreateChat.module.css';
import newChatIcon from '../ChatMenu/newChatIcon.svg';
import { ModalWindow } from '../common/ModalWindow/ModalWindow'
import InputArea from '../NewInputArea/InputArea'
import SelectArea from '../SelectArea/SelectArea'
import { getAllUsers } from '../../api/users'
import MembersInput from '../MembersInput/MembersInput'

const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}


export const CreateChat = ( {creatingChat, setCreatingChat} ) => {
    // eslint-disable-next-line
    const [members, setMembers] = useState([1, 2])
    // eslint-disable-next-line
    const [users, setUsers] = useState([])


    useEffect(() => {
        getAllUsers().then((data) => setUsers(data.users.map(item => item.login)))
    })

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
                />
                <SelectArea
                    required={true}
                    options={OPTIONS}
                />
                <MembersInput
                    members={members}
                />

            </form>
        </ModalWindow>
    )
}
