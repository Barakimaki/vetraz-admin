import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import {selectAddresses, selectCategories, selectPaymentTerms} from "../../store/courses/courses.selectors";
import SelectItem from "../selectItem/selectItem.component";

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
            <SelectItem item={category}
                        items={categories}
                        name={"Направление"}
                        handleChange={handleCategoryChange}
                        size={260}
            />
            <SelectItem item={address}
                        items={addresses}
                        name={"Адрес"}
                        handleChange={handleAddressChange}
                        size={260}
            />
            <SelectItem item={paymentTerm}
                        items={paymentTerms}
                        name={"Условие оплаты"}
                        handleChange={handlePaymentTermChange}
                        size={260}
            />
        </>
    );
};

export default Filter;