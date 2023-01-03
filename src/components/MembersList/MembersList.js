import React from 'react';
import styles from "./MembersList.module.css";
import plusIcon from "../../images/plusIcon.svg";

const MembersList = ({members, handleKickMember, isOwner}) => {
    return (
        <ul className={styles.members_list}>
            {members.map(item =>
                <li key={item.login}>
                    {item.login}
                    {isOwner &&
                        <img className={styles.button_kick_user}
                             alt={"kickUser"}
                             src={plusIcon}
                             onClick={() => {handleKickMember(item.login)}}
                        />
                    }
                </li>
            )}
        </ul>
    );
};

export default MembersList;