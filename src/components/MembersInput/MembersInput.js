import React, { useState } from 'react'
import styles from './MembersInput.module.css'
import { getAllUsers } from '../../api/users'

const MembersInput = ({ members, setMembers }) => {
    const [users, setUsers] = useState([])
    // eslint-disable-next-line
    const [findedUsers, setFindedUsers] = useState([])

    const liveSearch = (value) => {
        setFindedUsers(users.filter( user => user.indexOf(value) !== -1))
    }

    // const addMember = (e) => {
    //
    // }

    if (users.length === 0) {
        getAllUsers().then((data) => setUsers(data.users.map(item => item.login)))
    }

    const selectUser = function(e) {
        console.log(e.target.getAttribute('data-key'))
        e.target.className = e.target.className ? "" : styles.members_active_item;
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
                {/*<button className={styles.btn_add_member} onClick={e =>  addMember(e)}>Добавить</button>*/}
            </div>

            <div className={styles.members_wrapper}>
                <p className={styles.members_title}>Участники:</p>
                <ul className={styles.members_list}>
                    {findedUsers.map( name => (
                        <li
                            onClick={selectUser}
                            key={name}
                            data-key={name}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MembersInput;
