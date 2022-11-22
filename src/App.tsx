import './App.css';
import {Route, Routes} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import React, {useEffect} from "react";
import Header from "./components/header/Header.component";
import Courses from "./pages/courses/courses.component";
import {getCoursesStateAsync} from "./store/courses/courses.action";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store";
import CourseForm from "./components/courseForm/courseForm.component";


function App() {

    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(getCoursesStateAsync())
    }, [])

    return (
        <div className="App">
            <Header/>
            <Toolbar/>
            <Routes>
                <Route path='/*' element={<Courses/>}/>
                <Route path='/edit/:id' element={<CourseForm/>}/>
                <Route path='/add' element={<CourseForm/>}/>
            </Routes>
        </div>
    );
}

export default App;