import React, {useState} from 'react';
import styles from "./MembersList.module.css";
import plusIcon from "../../images/plusIcon.svg";
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import SelectableFilteredItemsList from "../SelectableFilteredItemsList/SelectableFilteredItemsList";
import SubmitButton from "../SubmitButton/SubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {kickUserAsync} from "../../store/asyncActions/kickUserAsync";
import {addManyMemberAsync} from "../../store/asyncActions/addManyMembersAsync";

const MembersList = ({isActive, changeActive, isOwner, chatId, members}) => {
    const [selectedMembers, setSelectedMembers] = useState([])

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.usersList).map( item => {
        return {...item, selected: false}
    })

    const handleKickMember = (login) => {
        dispatch(kickUserAsync(chatId, login));
    }
    return (
            <ModalWindow isOpen={isActive} onRequestClose={() => changeActive()}>
                <form className={styles.wrap}>
                    <img className={styles.btnCloseModal} alt={"CloseMembersList"} src={plusIcon}
                         onClick={() => {changeActive()}}/>
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
                    {isOwner && <><SelectableFilteredItemsList
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
                    >Добавить</SubmitButton></>}
                </form>
            </ModalWindow>
    );
};

export default MembersList;