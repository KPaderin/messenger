import React, { useState } from 'react'
import styles from './MembersInput.module.css'
import { getAllUsers } from '../../services/users'

const MembersInput = ({ members, setMembers }) => {
    const [users, setUsers] = useState([])
    const [foundUsers, setFoundUsers] = useState([])

    const liveSearch = (value) => {
        setFoundUsers(users.filter( user => user.login.indexOf(value) !== -1))
    }

    const selectUser = function(e, user) {
        if(user.selected === true)
            setMembers(members.filter(item => item !== user.login))
        else
            setMembers(members.concat(user.login))
        user.selected = !user.selected
        e.target.className = e.target.className ? "" : styles.members_active_item;
    }

    if (users.length === 0) {
        getAllUsers().then((data) => setUsers( data.users.map((item) => {
            return {login: item.login, selected: false}
        })))
    }

    return (
        <div>
            <div className={styles.input_wrapper}>
                <input
                    type={"text"}
                    placeholder={"Поиск пользователя"}
                    className={styles.input__my_input}
                    onChange={e => {
                        liveSearch(e.target.value)
                    }}
                />
            </div>

            <div className={styles.members_wrapper}>
                <p className={styles.members_title}>Участники:</p>
                <ul className={styles.members_list}>
                    {foundUsers.map( user => (
                        <li
                            className={!user.selected ? "" : styles.members_active_item}
                            onClick={(e) => selectUser(e, user)}
                            key={user.login}
                            data-key={user.login}>
                            {user.login}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MembersInput;
