import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

type Props = {
    item: string
    items: string[]
    name: string
    handleChange: (event: SelectChangeEvent) => void
    size: number
}

const SelectItem = ({item, items, name, handleChange, size}: Props) => {
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
                {items.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
        </FormControl>
    );
};

export default SelectItem;