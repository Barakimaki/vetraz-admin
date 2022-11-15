import styles from './courses.module.scss'
import Course from "../../components/course/course.component";
import React, {useState} from "react";
import {selectCourses} from "../../store/courses/courses.selectors";
import {useSelector} from "react-redux";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import {Backdrop} from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CourseForm from "../../components/courseForm/courseForm.component";


type Props = {
    category: string
    address: string
    paymentTerm: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Courses = ({category, address, paymentTerm}: Props) => {

    const courses = useSelector(selectCourses) || []

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [id, setId] = useState('')

    return (
        <div className={styles.coursesContainer}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => {
                    setId('')
                    handleClose()
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <CourseForm closeForm={handleClose} id={id}/>
                    </Box>
                </Fade>
            </Modal>
            <div className={styles.editBar}>
                <IconButton color="primary" size='large' title='Добавить курс'>
                    <AddCircleOutlineRoundedIcon onClick={() => {
                        setId('')
                        handleOpen()
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
                        if ((course.category === category || !category) &&
                            (course.address === address || !address) &&
                            (course.paymentTerm === paymentTerm || !paymentTerm)) {
                            return true
                        } else {
                            return false
                        }
                    })
                    .map(course => <Course key={course.id} course={course} handleOpen={handleOpen} setId={setId}/>)
                }
            </div>

        </div>
    );
};

export default Courses;
