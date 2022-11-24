import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import style from "./settings.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectAddresses, selectCategories, selectPaymentTerms} from "../../store/courses/courses.selectors";
import {Common} from "../../store/courses/courses.types";
import {updateCommonAsync} from "../../store/courses/courses.action";
import {AppDispatch} from "../../store/store";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const Settings = () => {

    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    const categories = useSelector(selectCategories) || []
    const addresses = useSelector(selectAddresses) || []
    const paymentTerms = useSelector(selectPaymentTerms) || []

    const handleDeleteItem = (item: string, itemFrom: 'addresses' | 'categories' | 'paymentTerms') => {
        const newCommon: Common = {
            addresses,
            categories,
            paymentTerms
        }
        switch (itemFrom) {
            case 'addresses': {
                newCommon.addresses = [...addresses].filter(address => (address !== item))
                break
            }
            case 'categories': {
                newCommon.categories = [...categories].filter(category => (category !== item))
                break
            }
            case 'paymentTerms': {
                newCommon.paymentTerms = [...paymentTerms].filter(category => (category !== item))
                break
            }
        }

        dispatch(updateCommonAsync(newCommon))

    }

    // <DeleteButton id={item}
    // handleDelete={handleDeleteItem}
    // />

    return (
        <div className={style.container}>
            <Button variant="contained" onClick={() => navigate('/')}>
                Назад
            </Button>
            <div className={style.settings}>
                <div>
                    <h2>Направление</h2>
                    {categories.map(category => <div>
                            <span>{category}</span>
                            <IconButton color='error'
                                        title='Удалить'
                                        onClick={() => handleDeleteItem(category, 'categories')}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    )}
                </div>
                <div>
                    <h2>
                        Адрес
                    </h2>
                    {addresses.map(address => <div>
                            <span>{address}</span>
                            <IconButton color='error'
                                        title='Удалить'
                                        onClick={() => handleDeleteItem(address, 'addresses')}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    )}
                </div>
                <div>
                    <h2>
                        Условие оплаты
                    </h2>
                    {paymentTerms.map(paymentTerm => <div>
                            <span>{paymentTerm}</span>
                            <IconButton color='error'
                                        title='Удалить'
                                        onClick={() => handleDeleteItem(paymentTerm, 'paymentTerms')}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default Settings;