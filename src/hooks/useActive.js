import {useCallback, useReducer} from "react";

const reducer = function(state, action) {
    switch(action.type) {
        case 'setActive':
            return { isActive: action.value }
        case 'changeActive':
            return { isActive: !state.isActive}
        default:
            return { isActive: false}
    }
}

const useActive = (initial) => {
    const [isActive, dispatch] = useReducer(reducer, {isActive: initial});

    return [
        isActive.isActive,
        useCallback((changed) => {
            if(changed === undefined)
                dispatch({type: 'changeActive'})
            else
                dispatch({type: 'setActive', value: changed})
        }, [])
    ];
};


export default useActive
