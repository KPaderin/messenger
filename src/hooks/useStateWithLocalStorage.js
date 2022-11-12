import {useEffect, useState} from "react";

const useStateWithLocalStorage = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key));

    useEffect(() => {
        setValue(localStorage.getItem(key))
    }, [localStorage.getItem(key)])

    return {
        value,
        setValue: (val) => {
            localStorage.setItem(key, val)
        }
    };
};

export default useStateWithLocalStorage