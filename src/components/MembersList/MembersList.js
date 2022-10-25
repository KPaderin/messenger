import React, {useEffect, useState} from 'react';
import styles from "./MembersList.module.css";
import plusIcon from "../../icons/plusIcon.svg";
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import SelectableFilteredItemsList from "../SelectableFilteredItemsList/SelectableFilteredItemsList";
import {getAllUsers} from "../../services/users";
import SubmitButton from "../SubmitButton/SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {kickUserAsync} from "../../store/asyncActions/kickUserAsync";
import {addManyMemberAsync} from "../../store/asyncActions/addManyMembersAsync";

const MembersList = ({isActive, setIsActive, isOwner, chatId}) => {
    const [selectedMembers, setSelectedMembers] = useState([])
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])

    const chatsList = useSelector(state => state.chats.chatsList)
    const dispatch = useDispatch();

    useEffect(() => {
        getAllUsers().then((data) => setUsers( data.users.map((item) => {
            return {name: item.login, id:item.login, image: item.image, login: item.login, selected: false}
        })))
    }, [isActive])

    useEffect(() => {
        chatsList.forEach((chat) => {
            if(chat.chatId === chatId)
                setMembers(chat.chatMembers)
        })
    }, [chatId, chatsList])

    const handleKickMember = (login) => {
        dispatch(kickUserAsync(chatId, login));
    }
    return (
            <ModalWindow isOpen={isActive} onRequestClose={() => setIsActive(false)}>
                <form className={styles.wrap}>
                    <img className={styles.btnCloseModal} alt={"CloseMembersList"} src={plusIcon}
                         onClick={() => {setIsActive(false)}}/>
                    <b className={styles.titleModal}>Участники</b>
                    <ul className={styles.members_list}>
                        {members.map(item => {
                          return <li key={item.login}>
                              {item.login}
                              {isOwner ? <img className={styles.button_kick_user}
                                   alt={"kickUser"} src={plusIcon}
                                   onClick={() => {handleKickMember(item.login)}}/> : null}
                          </li>
                        })}
                    </ul>
                    {isOwner ? <><SelectableFilteredItemsList
                        itemsList={users}
                        selectedItems={selectedMembers}
                        setSelectedItems={setSelectedMembers}
                        placeholder={"Поиск пользователя"}
                        title={"Добавить участника:"}
                    />
                    <SubmitButton
                        className={styles.my__button}
                        onClick={ e => {
                            dispatch(addManyMemberAsync(chatId, selectedMembers))
                        }}
                    >Добавить</SubmitButton></>: null}
                </form>
            </ModalWindow>
    );
};

export default MembersList;