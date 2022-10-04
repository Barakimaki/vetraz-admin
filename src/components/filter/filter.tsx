import React from 'react';
import styles from "../../pages/courses/courses.module.scss";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import {getAddresses, getCategories, getPaymentTerms} from "../../store/courses/courses.selectors";

type Props = {
    category: string,
    handleCategoryChange: (event: SelectChangeEvent) => void,
    address: string,
    handleAddressChange: (event: SelectChangeEvent) => void,
    paymentTerm: string,
    handlePaymentTermChange: (event: SelectChangeEvent) => void,


}

const Filter = ({
                    category,
                    handleCategoryChange,
                    address,
                    handleAddressChange,
                    paymentTerm,
                    handlePaymentTermChange
                }: Props) => {

    const categories = useSelector(getCategories) || []
    const addresses = useSelector(getAddresses) || []
    const paymentTerms = useSelector(getPaymentTerms) || []


    return (
        <>

            <FormControl sx={{m: 1, minWidth: 260}} size="small">
                <InputLabel>Направление</InputLabel>
                <Select
                    labelId="Categories"
                    id="categories"
                    value={category}
                    label="Направление"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">
                        <em>Все</em>
                    </MenuItem>
                    {categories.map(term => <MenuItem value={term}>{term}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 260}} size="small">
                <InputLabel>Адрес</InputLabel>
                <Select
                    labelId="Address"
                    id="demo-select-small"
                    value={address}
                    label="Адрес"
                    onChange={handleAddressChange}
                >
                    <MenuItem value="">
                        <em>Все</em>
                    </MenuItem>
                    {addresses.map(address => <MenuItem value={address}>{address}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 260}} size="small">
                <InputLabel>Условие оплаты</InputLabel>
                <Select
                    labelId="PaymentTerms"
                    id="paymentTerms"
                    value={paymentTerm}
                    label="Условие оплаты"
                    onChange={handlePaymentTermChange}
                >
                    <MenuItem value="">
                        <em>Все</em>
                    </MenuItem>
                    {paymentTerms.map(term => <MenuItem value={term}>{term}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    );
};

export default Filter;