import React, {useState} from 'react';
import styles from "./ChatMembers.module.css";
import plusIcon from "../../images/plusIcon.svg";
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import SelectableFilteredItemsList from "../SelectableFilteredItemsList/SelectableFilteredItemsList";
import SubmitButton from "../SubmitButton/SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {kickUserAsync} from "../../store/asyncActions/kickUserAsync";
import {addManyMemberAsync} from "../../store/asyncActions/addManyMembersAsync";
import MembersList from "../MembersList/MembersList";

const ChatMembers = React.memo(({isActive, changeActive, isOwner, chatId, members}) => {
    const [selectedMembers, setSelectedMembers] = useState([])
    const dispatch = useDispatch();

    const users = useSelector(state => state.users.usersList).map( item => {
        return {...item, selected: false}
    })

    const handleKickMember = (login) => {
        dispatch(kickUserAsync(chatId, login));
    }

    const handleInviteUsers = (e) => {
        e.preventDefault();
        dispatch(addManyMemberAsync(chatId, selectedMembers))
    }

    return (
            <ModalWindow isOpen={isActive} onRequestClose={() => changeActive()}>
                <form className={styles.wrap}>
                    <img className={styles.btnCloseModal}
                         alt={"CloseMembersList"}
                         src={plusIcon}
                         onClick={() => changeActive()}
                    />
                    <b className={styles.titleModal}>Участники</b>
                    <MembersList
                        isOwner={isOwner}
                        members={members}
                        handleKickMember={handleKickMember}
                    />
                    {isOwner && <>
                        <SelectableFilteredItemsList
                            itemsList={users}
                            selectedItems={selectedMembers}
                            setSelectedItems={setSelectedMembers}
                            placeholder={"Поиск пользователя"}
                            title={"Добавить участника:"}
                        />
                        <SubmitButton
                            onClick={handleInviteUsers}
                        >Добавить</SubmitButton>
                    </>}
                </form>
            </ModalWindow>
    );
})

export default ChatMembers;