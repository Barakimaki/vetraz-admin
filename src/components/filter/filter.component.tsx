import React from 'react';
import  {SelectChangeEvent} from "@mui/material/Select";

import {useSelector} from "react-redux";
import {selectAddresses, selectCategories, selectPaymentTerms} from "../../store/courses/courses.selectors";
import SelectItem from "../selectItem/selectItem.component";
import {Common} from "../../store/courses/courses.types";

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

    const common: Common = {
        categories,
        addresses,
        paymentTerms
    }



    return (
        <>
            <SelectItem item={category}
                        items={categories}
                        name={"Направление"}
                        handleChange={handleCategoryChange}
                        size={320}
                        common={common}
            />
            <SelectItem item={address}
                        items={addresses}
                        name={"Адрес"}
                        handleChange={handleAddressChange}
                        size={320}
                        common={common}
            />
            <SelectItem item={paymentTerm}
                        items={paymentTerms}
                        name={"Условие оплаты"}
                        handleChange={handlePaymentTermChange}
                        size={320}
                        common={common}
            />
        </>
    );
};

export default Filter;