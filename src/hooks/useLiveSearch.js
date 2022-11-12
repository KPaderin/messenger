import { useState } from "react";

const useLiveSearch = (itemsList) => {
    const [filteredItems, setFilteredItems] = useState([])

    return {
        value: filteredItems,
        onChange: (e) => {
            e.preventDefault()
            setFilteredItems(itemsList.filter( item => item.name.indexOf(e.target.value) !== -1))
        }
    };
};

export default useLiveSearch