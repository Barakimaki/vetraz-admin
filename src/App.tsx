import './App.css';
import {Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar/Navbar.component";
import Header from "./components/header/Header.component";
import {SelectChangeEvent} from "@mui/material/Select";
import Filter from "./components/filter/filter.component";
import Courses from "./pages/courses/courses.component";
import Timetable from "./pages/timetable/timetable.component";
import { getCoursesStateAsync} from "./store/courses/courses.action";
import {useDispatch} from "react-redux";
import { getCoursesState} from "./utils/firebase/firebase.utils";



function App() {

    const dispatch = useDispatch()

    const [pageTitle, setPageTitle] = useState('Курсы')

    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [paymentTerm, setPaymentTerm] = useState('');

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };
    const handleAddressChange = (event: SelectChangeEvent) => {
        setAddress(event.target.value);
    };
    const handlePaymentTermChange = (event: SelectChangeEvent) => {
        setPaymentTerm(event.target.value);
    };

    useEffect(()=>{
        // @ts-ignore
        dispatch(getCoursesStateAsync())
    },[])

    return (
        <div className="App">
            <Box sx={{display: 'flex'}}>
                <Header
                    pageTitle={pageTitle}
                />
                <Box
                    component="nav"
                    sx={{width: {sm: 240}, flexShrink: {sm: 0}}}
                    aria-label="mailbox folders"
                >
                    <Navbar
                        setPageTitle={setPageTitle}
                    />
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}}}
                >
                    <Toolbar/>
                    <Filter category={category}
                            handleCategoryChange={handleCategoryChange}
                            address={address}
                            handleAddressChange={handleAddressChange}
                            paymentTerm={paymentTerm}
                            handlePaymentTermChange={handlePaymentTermChange}
                    />
                    <Routes>
                        <Route path='/*' element={<Courses category={category}
                                                           address={address}
                                                           paymentTerm={paymentTerm}/>}
                        />
                        <Route path='/timetable' element={<Timetable category={category}
                                                                     address={address}
                                                                     paymentTerm={paymentTerm}/>}
                        />
                    </Routes>
                </Box>
            </Box>
        </div>
    );
}

export default App;