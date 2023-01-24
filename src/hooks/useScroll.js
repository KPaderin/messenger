import {useEffect, useRef} from "react";

const useScroll = (parentRef, childRef, callback) => {
    const observer = useRef();

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting)
                callback()
        }, options)
        childRef.current && observer.current.observe(childRef.current)

        let childRefCur = childRef.current
        return function () {
            childRefCur && observer.current.unobserve(childRefCur)
        };
    }, [callback, childRef, parentRef])
};

export default useScroll;