import { useState } from "react";

const useActive = (initial) => {
    const [isActive, setIsActive] = useState(initial);

    return {
        isActive,
        changeActive: (changed) => {
            if(changed === undefined)
                setIsActive(!isActive)
            else
                setIsActive(changed)
        }
    };
};

export default useActive