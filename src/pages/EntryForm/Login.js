import React, {useRef, useContext, useState, useEffect} from 'react';
import logo from '../../svg-2.svg';
import styles from './Login.module.css';
import InputArea from '../../components/InputArea/InputArea';
import {AuthContext} from '../../context';
import {authorization, register} from '../../services/authAndReg';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import useInput from "../../hooks/useInput";

const inputs = [
    {id: 1, placeHolderText: "Логин", auth:true},
    {id: 2, placeHolderText: "Пароль", auth:true},
    {id: 3, placeHolderText: "Имя", auth:false}
]

const type = {
    "auth":"Зарегистрироваться",
    "register":"Уже есть аккаунт?"
}

const Login = () => {
    const [typeForm, setTypeForm] = useState("auth")

    const login = useInput();
    const password = useInput();
    const name = useInput();

    const [inputAreas, setInputArea] = useState([
        {id: 1, placeHolderText: "Логин"},
        {id: 2, placeHolderText: "Пароль"}
    ]);
    const [buttons, setButton] = useState("Войти");
    const [formExtension, setFormExtension] = useState("Зарегистрироваться");


    const switchForm = function(e) {
        e.preventDefault();
        if(e.target.text === "Уже есть аккаунт?")
        {
            setFormExtension("Зарегистрироваться");
            setButton("Войти");
            setInputArea(inputAreas.slice(0,2));
        }
        else
        {
            setFormExtension("Уже есть аккаунт?");
            setButton("Зарегистрироваться");
            setInputArea(inputAreas.concat({id: 3, placeHolderText: "Имя"}));
        }
    };
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const inputRef = [useRef(), useRef(), useRef()];

    const submit = function(e) {
        e.preventDefault();
        if(inputRef[0].current.value === "" || inputRef[1].current.value === "")
        {
            alert("Заполните поля")
            return
        }
        if(e.target.textContent === "Войти")
            authorization(`"` + inputRef[0].current.value + `"`,
                `"` + inputRef[1].current.value + `"`, isAuth, setIsAuth)
        else
        {
            if(inputRef[2].current.value === "")
            {
                alert("Заполните поля")
                return
            }
            register(`"` + inputRef[0].current.value + `"`,
                `"` + inputRef[1].current.value + `"`, `"` + inputRef[2].current.value + `"`, isAuth,
                setIsAuth)
        }
    };

    return (
        <section className={styles.wrap_allDisplay}>
            <article className={styles.wrap__containerForm}>
                <form className={styles.authForm}>
                    <div className={styles.authFrom__logoWrap}>
                        <img alt="logo" src={logo} className={styles.logo}/>
                    </div>
                    {inputAreas.map(inputArea =>
                        <InputArea ref={inputRef[inputArea.id-1]}
                                   placeholderText={inputArea.placeHolderText}
                                   key={inputArea.id}/>
                    )}
                    <SubmitButton onClick={submit}>{buttons}</SubmitButton>
                    <a onClick={switchForm} href="/#">{formExtension}</a>
                </form>
            </article>
        </section>
    );
};

export default Login;
