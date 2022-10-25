import React, { useState } from 'react'
import styles from './SelectableFiltredItemsList.module.css'

const SelectableFilteredItemsList = ({ itemsList, selectedItems, setSelectedItems, placeholder, title }) => {
    const [filteredItems, setFilteredItems] = useState([])

    const liveSearch = (value) => {
        setFilteredItems(itemsList.filter( item => item.name.indexOf(value) !== -1))
    }

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
            <div className={styles.input_wrapper}>
                <input
                    type={"text"}
                    placeholder={placeholder}
                    className={styles.input__my_input}
                    onChange={e => {
                        liveSearch(e.target.value)
                    }}
                />
            </div>
            <div className={styles.items_wrapper}>
                <p className={styles.items_title}>{title}</p>
                <ul className={styles.items_list}>
                    {filteredItems.map( item => (
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
