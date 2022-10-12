import React, {ChangeEvent, useEffect, useState} from 'react';
import {FormHelperText, Typography, Input} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {useSelector} from "react-redux";
import {selectCourse} from "../../store/courses/courses.selectors";
import {ICourse} from "../../store/courses/courses.types";

type Props = {
    id: string
    setId: (id: string) => void
    closeForm: () => void
}

const CourseForm = ({closeForm, id, setId}: Props) => {
    let course: ICourse | null = useSelector(selectCourse(id))

    let [inputError, setInputError] = useState(false)
    let [courseName, setCourseName] = useState(course?.courseName)

    return (
        <form action="">
            <Typography gutterBottom variant="h5" component="div">
                Название курса
            </Typography>
            <FormControl error={inputError} variant="standard">
                <Input placeholder="Название курса" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                    setInputError(false)
                   // setTitle(e.target.value)
                }} defaultValue={courseName}/>
                {inputError && <FormHelperText id="component-error-text">Название не может быть пустым</FormHelperText>}
            </FormControl>


        </form>
    );
};

export default CourseForm;