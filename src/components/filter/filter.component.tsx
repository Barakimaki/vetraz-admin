import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import {selectAddresses, selectCategories, selectPaymentTerms} from "../../store/courses/courses.selectors";

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

    const categories = useSelector(selectCategories) || []
    const addresses = useSelector(selectAddresses) || []
    const paymentTerms = useSelector(selectPaymentTerms) || []


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
                    {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 260}} size="small">
                <InputLabel>Адрес</InputLabel>
                <Select
                    labelId="Address"
                    id="adresses"
                    value={address}
                    label="Адрес"
                    onChange={handleAddressChange}
                >
                    <MenuItem value="">
                        <em>Все</em>
                    </MenuItem>
                    {addresses.map(address => <MenuItem key={address} value={address}>{address}</MenuItem>)}
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
                    {paymentTerms.map(term => <MenuItem key={term} value={term}>{term}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    );
};

export default Filter;