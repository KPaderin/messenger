import React, { useEffect, useState } from 'react'
import styles from './MembersInput.module.css'
import { getAllUsers } from '../../api/users'

const MembersInput = ({ members }) => {
    const [users, setUsers] = useState([])
    // eslint-disable-next-line
    const [correctUsers, setCorrectUsers] = useState([])

    const liveSearch = (value) => {
        setCorrectUsers(users.filter( user => user.indexOf(value) !== -1))
    }

    useEffect(() => {
        getAllUsers().then((data) => setUsers(data.users.map(item => item.login)))
    })

    return (
        <div>
            <input
                type={"text"}
                placeholder={"Поиск пользователя"}
                className={styles.input__my_input}
                onChange={e => liveSearch(e.target.value)}
            ></input>

            <ul>
                {members.map( name => (
                    <li>{name}</li>
                ))}
            </ul>
        </div>
    )
}

export default MembersInput;
