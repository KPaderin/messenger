import React, {useContext} from 'react';
import logo from '../../images/logo.svg';
import styles from './Login.module.css';
import InputArea from '../../components/InputArea/InputArea';
import {AuthContext} from '../../context';
import {authorization, register} from '../../services/authAndReg';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

const forms = [
    {
        toggleText: "Зарегистрироваться",
        buttonText: "Войти",
        nameField: false,
        funcOnSubmit: authorization
    },
    {
        toggleText: "Уже есть аккаунт?",
        buttonText: "Зарегистрироваться",
        nameField: true,
        funcOnSubmit: register
    }
];

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);

    const currentForm = useToggle(forms);
    const waitingText = useToggle(["", "Подождите"]);
    const login = useInput();
    const password = useInput();
    const name = useInput();

    const handleSwitchForm = function(e) {
        e.preventDefault();
        currentForm.onClick(e);
    };

    const handleSubmit = function(e) {
        e.preventDefault();
        e.target.disabled = true;
        waitingText.onClick(e);
        let userData = {login:login.value, password:password.value, name:name.value};
        currentForm.value.funcOnSubmit(userData, setIsAuth).then(() => {
            e.target.disabled = false;
            waitingText.onClick(e);
        })
    };

    return (
        <section className={styles.wrap_allDisplay}>
            <article className={styles.wrap__containerForm}>
                <form className={styles.authForm}>
                    <div className={styles.authFrom__logoWrap}>
                        <img alt="logo" src={logo} className={styles.logo}/>
                    </div>
                    <InputArea {...login} placeholder={"Логин"}/>
                    <InputArea {...password} placeholder={"Пароль"} type={"password"}/>
                    {currentForm.value.nameField &&
                        <InputArea {...name} placeholder={"Имя"}/>
                    }
                    <SubmitButton onClick={handleSubmit}>
                        {waitingText.value || currentForm.value.buttonText}
                    </SubmitButton>
                    <a onClick={handleSwitchForm} href="/#">
                        {currentForm.value.toggleText}
                    </a>
                </form>
            </article>
        </section>
    );
};

export default Login;
