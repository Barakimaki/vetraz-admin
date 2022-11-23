import {ICourse} from "../../store/courses/courses.types";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditIcon from '@mui/icons-material/Edit';
import style from "./course.module.scss";
import DeleteButton from "../deleteTaskButton/DeleteButton";
import {deleteCourseAsync} from "../../store/courses/courses.action";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {Schedule} from "@mui/icons-material";


type Props = {
    course: ICourse
}

const Course = ({course}:Props) => {

    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    const deleteCourse = (course: ICourse): void => {
        dispatch(deleteCourseAsync(course))
    }

    return (
        <Card sx={{minHeight:460}}>
            <CardMedia
                component="img"
                height="140"
                image={course.imageUrl}
                alt=""
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Контактный телефон: {course.contactPhone}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Направление: {course.category}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    Возраст обучающихся: {course.studentsAge?.from}-{course.studentsAge?.to}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {course.description}
                </Typography>
                <Typography variant="body2" color="error.main">
                    {course.paymentTerm}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {course.teacherName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Адрес: {course.address}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={style.parentFlexSplit}>
                <IconButton color='primary'
                            title='Редактировать'
                            onClick={() => {
                                navigate(`/edit/${course.id}`)
                            }}>
                    <EditIcon/>
                </IconButton>
                <IconButton color='default'
                            title='Расписание'
                            onClick={() => {
                                navigate(`/schedule/${course.id}`)
                            }}>
                    <Schedule />
                </IconButton>
                <div className={style.rightAlignItem}>
                    <DeleteButton course={course} handleDelete={deleteCourse}/>
                </div>
            </CardActions>
        </Card>
    );
};

export default Course;