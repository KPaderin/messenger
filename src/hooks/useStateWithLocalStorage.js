import {useState} from "react";

const useStateWithLocalStorage = (key) => {
    const [value, setValue] = useState(localStorage.getItem(key));

    return {
        value,
        setValue: (val) => {
            setValue(val)
            localStorage.setItem(key, val)
        }
    };
};

export default useStateWithLocalStorage