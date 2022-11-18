import React, {ChangeEvent, useEffect, useState} from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DeleteButton from "../deleteTaskButton/DeleteButton";
import {useDispatch} from "react-redux";
import {Common} from "../../store/courses/courses.types";
import {updateCommonAsync} from "../../store/courses/courses.action";
import {AppDispatch} from "../../store/store";
import {Button, Input} from "@mui/material";

type Props = {
    item: string
    items: string[]
    name: string
    handleChange: (event: SelectChangeEvent) => void
    size: number,
    common: Common
}

const SelectItem = ({item, items, name, handleChange, size, common}: Props) => {

    useEffect(() => {
        console.log(item)
    })

    const dispatch: AppDispatch = useDispatch()

    const [newItem, setNewItem] = useState('')
    const [addNewItem, setAddNewItem] = useState(false)

    const handleAddItem = (item: string) => {
        const newCommon: Common = {
            addresses: [...common.addresses],
            categories: [...common.categories],
            paymentTerms: [...common.paymentTerms]
        }
        if (name === 'Адрес') {
            newCommon.addresses = [...newCommon.addresses, item]
        }
        if (name === 'Направление') {
            newCommon.categories = [...newCommon.categories, item]
        }
        if (name === 'Условие оплаты') {
            newCommon.paymentTerms = [...newCommon.paymentTerms, item]
        }
        dispatch(updateCommonAsync(newCommon))
        setNewItem('')
        setAddNewItem(false)
    }

    const handleDeleteItem = (item: string) => {
        const newCommon: Common = {
            addresses: [...common.addresses].filter(address => (address !== item)),
            categories: [...common.categories].filter(category => (category !== item)),
            paymentTerms: [...common.paymentTerms].filter(paymentTerm => (paymentTerm !== item))
        }
        dispatch(updateCommonAsync(newCommon))

    }

    return (
        <FormControl sx={{m: 1, minWidth: size}} size="small">
            <InputLabel>{name}</InputLabel>
            <Select
                value={item}
                label={name}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>Все</em>
                </MenuItem>
                {items.map(item => <MenuItem key={item} value={item}>{item} </MenuItem>
                    // <DeleteButton id={item}
                    // handleDelete={handleDeleteItem}
                    // />
                )}
                {addNewItem
                    ? <div>
                        <Input placeholder="Новое значение" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setNewItem(e.target.value)
                        }}/>
                        <Button variant="contained" onClick={() => handleAddItem(newItem)}>
                            Добавить
                        </Button>
                    </div>
                    : <div>
                        <Button variant="contained" onClick={() => {
                            setAddNewItem(true)
                        }}>
                            Добавить новое значение
                        </Button>
                    </div>
                }
            </Select>
        </FormControl>
    );
};

export default SelectItem;