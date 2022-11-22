import styles from './courses.module.scss'
import Course from "../../components/course/course.component";
import React, {useState} from "react";
import {selectCourses} from "../../store/courses/courses.selectors";
import {useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import Filter from "../../components/filter/filter.component";
import {SelectChangeEvent} from "@mui/material/Select";
import {useNavigate} from "react-router-dom";



const Courses = () => {

    const courses = useSelector(selectCourses) || []

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

    const navigate = useNavigate()

    return (
        <div className={styles.coursesContainer}>
            <div>
                <Filter category={category}
                        handleCategoryChange={handleCategoryChange}
                        address={address}
                        handleAddressChange={handleAddressChange}
                        paymentTerm={paymentTerm}
                        handlePaymentTermChange={handlePaymentTermChange}
                />
                <div className={styles.editBar}>
                    <IconButton color="primary" size='large' title='Добавить курс'>
                        <AddCircleOutlineRoundedIcon onClick={() => {
                            navigate('/add')
                        }}/>
                    </IconButton>
                </div>
                <div className={styles.courses}>
                    {courses
                        .sort((a, b) => {
                            if (a.courseName < b.courseName) //сортируем строки по возрастанию
                                return -1
                            if (a.courseName > b.courseName)
                                return 1
                            return 0
                        })
                        .filter(course => {
                            return (course.category === category || !category) &&
                                (course.address === address || !address) &&
                                (course.paymentTerm === paymentTerm || !paymentTerm);
                        })
                        .map(course => <Course key={course.id} course={course}/>)
                    }
                </div>
            </div>


        </div>
    );
};

export default Courses;
