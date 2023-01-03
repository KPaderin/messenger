import { useState } from "react";

const useToggle = (initial) => {
    const [index, setIndex] = useState(0);
    return {
        value:initial[index],
        onClick: () => {
            setIndex((index+1) % initial.length)
        }
    };
};

export default useToggle