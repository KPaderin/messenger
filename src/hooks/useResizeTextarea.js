import { useState, useRef } from "react";

const useResizeTextArea = (initial, maxHeight) => {
    const ref = useRef(null);
    const [value, setValue] = useState(initial || "");
    const defaultHeight = 90
    return {
        ref,
        value,
        onChange: e => {
            setValue(e.target.value)
            ref.current.style.height = "0px";
            let scrollHeight = ref.current.scrollHeight;
            ref.current.style.height = Math.min(maxHeight || defaultHeight, scrollHeight) + "px";
        }
    };
};

export default useResizeTextArea