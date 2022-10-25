import React, {useEffect, useState} from "react"
import styles from './CreateChat.module.css'
import plusIcon from '../ChatMenu/newChatIcon.svg'
import { ModalWindow } from '../common/ModalWindow/ModalWindow'
import DropdownList from '../DropdownList/DropdownList'
import {createChatAndGetStatus} from '../../services/chats'
import SelectableFilteredItemsList from '../SelectableFilteredItemsList/SelectableFilteredItemsList'
import SubmitButton from "../SubmitButton/SubmitButton"
import {addChat} from "../../store/actionCreators/addChat"
import {useDispatch} from "react-redux"
import {getAllUsers} from "../../services/users";
import InputUnderlining from "../common/InputUnderlining/InputUnderlining";

const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}

const CreateChat = ( {creatingChat, setCreatingChat} ) => {

    const [selectedMembers, setSelectedMembers] = useState([])
    const [users, setUsers] = useState([])
    const [chatName, setChatName] = useState("")
    const [chatType, setChatType] = useState("CHANNEL")

    const dispatch = useDispatch()

    useEffect(() => {
        getAllUsers().then((data) => setUsers( data.users.map((item) => {
            return {name: item.login, login:item.login, id:item.login, selected: false}
        })))
    }, [creatingChat])

    const createChatHandler = (e) => {
        e.preventDefault()
        createChatAndGetStatus(chatName, chatType, selectedMembers.map(member => member.name)).then((res) => {
            if(res.hasOwnProperty("errorsMessage")) {
                alert(res.errorsMessage)
                return
            }
            dispatch(
                addChat(res.ownerLogin,[],selectedMembers,res.id,chatType,chatName, null)
            )
        })
        setSelectedMembers([])
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
                <InputUnderlining
                    placeholderText={"Название"}
                    textValue={chatName}
                    setTextValue={setChatName}
                />
                <DropdownList
                    required={true}
                    options={OPTIONS}
                    onChange={ e => setChatType(e.target.value) }
                />
                <SelectableFilteredItemsList
                    itemsList={users}
                    selectedItems={selectedMembers}
                    setSelectedItems={setSelectedMembers}
                    placeholder={"Поиск пользователя"}
                    title={"Участники:"}
                />
                <SubmitButton onClick={ e => {
                    createChatHandler(e)
                    setCreatingChat(false) }}>Создать</SubmitButton>
            </form>
        </ModalWindow>
    )
}

export default CreateChat;