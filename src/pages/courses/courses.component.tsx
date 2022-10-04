import styles from './courses.module.scss'
import Course from "../../components/course/course";
import {SelectChangeEvent} from '@mui/material/Select';
import React, {useState} from "react";
import Filter from "../../components/filter/filter";
import {getCourses} from "../../store/courses/courses.selectors";
import {useDispatch, useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";




const Courses = () => {

    const courses = useSelector(getCourses) || []

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


    return (
        <div className={styles.coursesContainer}>
            <div className={styles.editBar}>
                <IconButton color="primary" size='large' title='Добавить курс'>
                    <AddCircleOutlineRoundedIcon onClick={() => {
                    }}/>
                </IconButton>
                <Filter category={category}
                        handleCategoryChange={handleCategoryChange}
                        address={address}
                        handleAddressChange={handleAddressChange}
                        paymentTerm={paymentTerm}
                        handlePaymentTermChange={handlePaymentTermChange}
                />
            </div>

            <div className={styles.courses}>
                {courses.filter(course=>{
                if((course.category === category || !category) &&
                    (course.address === address || !address) &&
                    (course.paymentTerms === paymentTerm || !paymentTerm)){
                    return true
                } else {return false}
            }).map(course=><Course key={course.id} course={course}/>)}

            </div>
        </div>
    );
};

export default Courses;
