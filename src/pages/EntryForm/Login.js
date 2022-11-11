import React, { useContext } from 'react';
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
        formType: "auth",
        toggleText: "Зарегистрироваться",
        buttonText: "Войти"
    },
    {
        formType: "register",
        toggleText: "Уже есть аккаунт?",
        buttonText: "Зарегистрироваться"
    }
];

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const currentForm = useToggle(forms)
    const login = useInput();
    const password = useInput();
    const name = useInput();
    const waitingText = useToggle(["", "Подождите"])

    const handleSwitchForm = function(e) {
        e.preventDefault();
        currentForm.onClick(e);
    };

    const submit = function(e) {
        e.preventDefault();
        waitingText.onClick(e);
        let userData = {login:login.value, password:password.value, name:name.value}
        e.target.disabled = true;
        if(currentForm.value.formType === "register")
            register(userData, isAuth, setIsAuth).then(res => {
                e.target.disabled = false;
                waitingText.onClick(e);
            })
        if(currentForm.value.formType === "auth")
            authorization(userData, setIsAuth).then(res => {
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
                    <InputArea {...name} placeholder={"Имя"}/>
                    <SubmitButton onClick={submit}>
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
