import React, {useCallback, useEffect, useState} from 'react';
import {ModalWindow} from "../common/ModalWindow/ModalWindow";
import styles from "./UserProfile.module.css";
import plusIcon from "../../images/plusIcon.svg";
import YesNoButtons from "../common/YesNoButtons/YesNoButtons";
import CheckableBoxItem from "../common/CheckableBoxItem/CheckableBoxItem";
import {updateUserAsync} from "../../store/asyncActions/updateUserAsync";
import {useDispatch} from "react-redux";

const UserProfile = ({isActive, changeActive, userProfile, isMutable}) => {
    const dispatch = useDispatch();
    const [useDefaultImage, setUseDefaultImage] = useState(false)

    const closeModalHandler = useCallback(() => {
        changeActive();
    },[changeActive])

    const handleUpdateUser = function(e) {
        e.preventDefault();
        dispatch(updateUserAsync(userProfile.login, useDefaultImage));
        changeActive();
    }

    const handleHideUpdateUser = function() {
        changeActive()
    }

    useEffect(() => {
        setUseDefaultImage(userProfile.image !== null && userProfile.image !== "null");
    }, [userProfile.image])

    return (
            <ModalWindow isOpen={isActive} onRequestClose={closeModalHandler}>
                <form className={styles.editProfileForm}>
                    <div
                        onClick={closeModalHandler}
                        className={styles.btnCloseModal}>
                        <img alt={"Close"} src={plusIcon} />
                    </div>
                    <b className={styles.titleModal}>Профиль</b>
                    <ul className={styles.userInfo}>
                        <li>Имя:<div>{userProfile.name}</div></li>
                        <li>Логин:<div>{userProfile.login}</div></li>
                    </ul>
                    {isMutable &&
                        <><CheckableBoxItem
                        text={"Использовать дефолтную аватарку?"}
                        isCheck={useDefaultImage}
                        setIsCheck={setUseDefaultImage}
                        />
                        <YesNoButtons
                            yesText={"Сохранить"}
                            noText={"Отменить"}
                            yesClick={(e) => handleUpdateUser(e)}
                            noClick={(e) => handleHideUpdateUser(e)}
                        />
                    </>}
                </form>
            </ModalWindow>
    );
};

export default React.memo(UserProfile);