import React, {useRef, useEffect, useContext, useState} from 'react';
import logo from '../../svg-2.svg';
import styles from './EntryForm.module.css';
import InputArea from '../InputArea/InputArea';
import {AuthContext} from '../../context/index';

const EntryForm = () => {
    const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'
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

    function authorization(login, password) {
            fetch(URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query: `
                    query{
                      signIn(
                        login: ` + login +
                        `password: ` + password + `
                      )
                    }`
                })
            }).then(res => res.json())
                .then(json => {
                    if(json.hasOwnProperty("errors"))
                        alert("Произошла ошибка :(")
                    else {
                        setIsAuth(true);
                        localStorage.setItem('auth', json.data.signIn);
                    }
                })
    }

    function register(login, password, name) {
        fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
                    mutation{
                      register(
                        login:` + login +
                        `password:` + password +
                        `name:` + name + `
                      ) {
                        image
                      }
                    }`
            })
        }).then(res => res.json())
            .then(json => {
                if(json.hasOwnProperty("errors"))
                    alert("Произошла ошибка :(")
                else {
                    alert("Добро пожаловать)")
                }
            })
    }

    const inputRef = [useRef(), useRef(), useRef()];
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const submit = function(e) {
        e.preventDefault();
        if(inputRef[0].current.value === "" || inputRef[1].current.value === "")
        {
            alert("Заполните поля")
            return
        }
        if(e.target.textContent === "Войти")
            authorization(`"` + inputRef[0].current.value + `"`,
                `"` + inputRef[1].current.value + `"`)
        else
        {
            if(inputRef[2].current.value === "")
            {
                alert("Заполните поля")
                return
            }
            register(`"` + inputRef[0].current.value + `"`,
                `"` + inputRef[1].current.value + `"`, `"` + inputRef[2].current.value + `"`)
        }
    };

    useEffect(() => {
        if(isAuth === true){
            console.log(123);
        };
    }, [isAuth]);

    return (
        <div className={styles.hystmodal}>
            <div className={styles.hystmodal__window}>
                <form className={styles.hystmodal__wrap}>
                    <div className={styles.logo__wrap}>
                        <img alt="logo" src={logo} className={styles.entry__logo}/>
                    </div>
                    {inputAreas.map(inputArea =>
                        <InputArea ref={inputRef[inputArea.id-1]}
                                   placeholderText={inputArea.placeHolderText}
                                   key={inputArea.id}/>
                    )}
                    <button onClick={submit} className={styles.my__button}>{buttons}</button>
                    <div className={styles.extension__wrap}>
                        <a onClick={switchForm} href="/#">{formExtension}</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EntryForm;