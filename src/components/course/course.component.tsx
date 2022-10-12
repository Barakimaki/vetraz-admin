import {ICourse} from "../../store/courses/courses.types";
import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';


type Props = {
    course: ICourse
    setId: (id: string) => void
    handleOpen: () => void
}

const Course = ({course, setId, handleOpen}:Props) => {
    return (
        <Card>
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
                    Контактный телефон {course.contactPhone}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Направление: {course.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {course.description}
                </Typography>
                <Typography variant="body2" color="error.main">
                    {course.paymentTerms}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {course.teacherName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Адрес: {course.address}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton color='primary'
                            title='Редактировать'
                            onClick={() => {
                                setId(course.id)
                                handleOpen()
                            }}>
                    <EditIcon/>
                </IconButton>
                <IconButton color='error' title='Удалить курс' onClick={() => {}}>
                    <DeleteRoundedIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Course;