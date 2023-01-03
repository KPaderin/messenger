import React from 'react'
import styles from './SelectableFiltredItemsList.module.css'
import InputUnderlining from "../common/InputUnderlining/InputUnderlining";
import useLiveSearch from "../../hooks/useLiveSearch";

const SelectableFilteredItemsList = ({ itemsList, selectedItems, setSelectedItems, placeholder, title }) => {
    const filterItems = useLiveSearch(itemsList)

    const selectItem = function(e, item) {
        if(item.selected === true)
            setSelectedItems(selectedItems.filter(i => i !== item.name))
        else
            setSelectedItems(selectedItems.concat(item))
        item.selected = !item.selected
        e.target.className = e.target.className ? "" : styles.items_active_item;
    }

    return (
        <>
            <InputUnderlining
                type={"text"}
                placeholder={placeholder}
                onChange={filterItems.onChange}
            />
            <div className={styles.items_wrapper}>
                <p className={styles.items_title}>{title}</p>
                <ul>
                    {filterItems.value.map( item => (
                        <li
                            className={!item.selected ? "" : styles.items_active_item}
                            onClick={(e) => selectItem(e, item)}
                            key={item.id}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SelectableFilteredItemsList;
