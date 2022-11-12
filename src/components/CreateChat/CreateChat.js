import React, {useEffect, useState} from "react";
import styles from "./CreateChat.module.css";
import plusIcon from "../../images/plusIcon.svg";
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import DropdownList from "../DropdownList/DropdownList";
import SelectableFilteredItemsList from "../SelectableFilteredItemsList/SelectableFilteredItemsList";
import SubmitButton from "../SubmitButton/SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import InputUnderlining from "../common/InputUnderlining/InputUnderlining";
import useInput from "../../hooks/useInput";
import {createChatAsync} from "../../store/asyncActions/createChatAsync";
import {usersListSelector} from "../../store/selectors";

const OPTIONS = {
    "CHANNEL": "Канал",
    "GROUP": "Группа",
    "PRIVATE": "Приватный чат",
}

const CreateChat = ( {isActive, changeActive} ) => {
    const chatName = useInput("")
    const [selectedMembers, setSelectedMembers] = useState([])
    const [chatType, setChatType] = useState("CHANNEL")

    const dispatch = useDispatch()
    const users = useSelector(usersListSelector).map( item => {
        return {...item, selected: false}
    })

    useEffect(() => {
        chatName.reset()
        setSelectedMembers([])
        setChatType("CHANNEL")
    }, [isActive])

    const createChatHandler = (e) => {
        e.preventDefault()
        dispatch(createChatAsync(chatName.value, chatType, selectedMembers))
        changeActive()
    }

    return (
        <ModalWindow isOpen={isActive} onRequestClose={() => changeActive()}>
            <div
                onClick={() => changeActive()}
                className={styles.btnCloseModal}>
                <img alt={"Close"} src={plusIcon} />
            </div>
            <b className={styles.titleModal}>Создание чата</b>
            <form className={styles.createChatForm}>
                <InputUnderlining
                    placeholder={"Название"}
                    {...chatName}
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
                <SubmitButton
                    onClick={createChatHandler}>Создать</SubmitButton>
            </form>
        </ModalWindow>
    )
}

export default React.memo(CreateChat);