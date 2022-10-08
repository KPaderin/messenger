import React, { useState } from "react"
import styles from './CreateChat.module.css'
import plusIcon from '../ChatMenu/newChatIcon.svg'
import { ModalWindow } from '../common/ModalWindow/ModalWindow'
import SelectArea from '../SelectArea/SelectArea'
import { createChatAndGetStatus } from '../../services/chats'
import MembersInput from '../MembersInput/MembersInput'
import SubmitButton from "../SubmitButton/SubmitButton"
import {addChat} from "../../store/actionCreators/addChat"
import {useDispatch} from "react-redux"
const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}

const CreateChat = ( {creatingChat, setCreatingChat} ) => {

    const [members, setMembers] = useState([])
    const [chatName, setChatName] = useState("")
    const [chatType, setChatType] = useState("CHANNEL")

    const dispatch = useDispatch()

    const createChatHandler = (e) => {
        e.preventDefault()
        createChatAndGetStatus(chatName, chatType, members).then((res) => {
            if(res.hasOwnProperty("errorsMessage")) {
                alert(res.errorsMessage)
                return
            }
            dispatch(
                addChat(res.ownerLogin,[],members,res.id,chatType,chatName)
            )
        })
        setMembers([])
        setChatName("")
        setChatType("CHANNEL")
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
                className={styles.input__my_input}
                onChange={e => setChatName(e.target.value)}
                />
                <SelectArea
                    required={true}
                    options={OPTIONS}
                    onChange={ e => setChatType(e.target.value) }
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

export default CreateChat;