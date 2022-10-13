import React, {ChangeEvent, useState} from 'react';
import {FormHelperText, Typography, Input, TextField, Button} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {useSelector, useDispatch} from "react-redux";
import {
    selectAddresses,
    selectCategories,
    selectCourse, selectCourses,
    selectPaymentTerms
} from "../../store/courses/courses.selectors";
import {ICourse} from "../../store/courses/courses.types";
import {SelectChangeEvent} from "@mui/material/Select";
import SelectItem from "../selectItem/selectItem.component";
import {v4 as uuidv4} from 'uuid'
import {addNewCourse, editCourse} from "../../store/courses/courses.action";

type Props = {
    id: string
    setId: (id: string) => void
    closeForm: () => void
}

const CourseForm = ({closeForm, id, setId}: Props) => {

    const dispatch = useDispatch()

    let course: ICourse | null = useSelector(selectCourse(id))
    const courses = useSelector(selectCourses)
    const categories = useSelector(selectCategories) || []
    const paymentTerms = useSelector(selectPaymentTerms) || []
    const addresses = useSelector(selectAddresses) || []

    let [inputError, setInputError] = useState(false)
    let [courseName, setCourseName] = useState(course?.courseName || '')
    let [category, setCategory] = useState(course?.category || '')
    let [contactPhone, setContactPhone] = useState(course?.contactPhone || '')
    let [description, setDescription] = useState(course?.description || '')
    let [paymentTerm, setPaymentTerm] = useState(course?.paymentTerm || '')
    let [teacherName, setTeacherName] = useState(course?.teacherName || '')
    let [address, setAddress] = useState(course?.address || '')

    return (
        <form action="">
            <Typography gutterBottom variant="h5" component="div">
                Название курса
            </Typography>
            <FormControl error={inputError} variant="standard" sx={{m: 1, minWidth: 620}}>
                <Input placeholder="Название курса" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputError(false)
                    setCourseName(e.target.value)
                }} defaultValue={courseName}/>
                {inputError && <FormHelperText id="component-error-text">Название не может быть пустым</FormHelperText>}
            </FormControl>
            <Typography gutterBottom variant="h5" component="div">
                Контактный телефон
            </Typography>
            <FormControl variant="standard" sx={{m: 1, minWidth: 240}}>
                <Input placeholder="Контактный телефон" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setContactPhone(e.target.value)
                }} type='tel' defaultValue={contactPhone}/>
            </FormControl>
            <Typography gutterBottom variant="h5" component="div">
                Направление
            </Typography>
            <SelectItem item={category}
                        items={categories}
                        name={'Направление'}
                        handleChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
                        size={260}/>
            <Typography gutterBottom variant="h5" component="div">
                Описание
            </Typography>
            <FormControl variant="standard" sx={{m: 1, minWidth: 720}}>
                <TextField
                    multiline
                    rows={4}
                    defaultValue={description}
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDescription(e.target.value)
                    }}
                />
            </FormControl>
            <Typography gutterBottom variant="h5" component="div">
                Условие оплаты
            </Typography>
            <SelectItem item={paymentTerm}
                        items={paymentTerms}
                        name={'Условие оплаты'}
                        handleChange={(event: SelectChangeEvent) => setPaymentTerm(event.target.value)}
                        size={260}/>
            <Typography gutterBottom variant="h5" component="div">
                Руководитель
            </Typography>
            <FormControl variant="standard" sx={{m: 1, minWidth: 320}}>
                <Input placeholder="Руководитель" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTeacherName(e.target.value)
                }} defaultValue={teacherName}/>
            </FormControl>
            <Typography gutterBottom variant="h5" component="div">
                Адрес
            </Typography>
            <SelectItem item={address}
                        items={addresses}
                        name={'Адрес'}
                        handleChange={(event: SelectChangeEvent) => setAddress(event.target.value)}
                        size={260}/>
            <div>
                <Button variant="contained" onClick={()=>{
                    let newCourseData: ICourse = {
                        id: course?.id || uuidv4(),
                        address,
                        contactPhone,
                        courseName,
                        category,
                        description,
                        imageUrl: course?.imageUrl || '',
                        paymentTerm,
                        studentsAge: course?.studentsAge || [],
                        teacherName
                    }
                    if(courseName.length > 0){
                        course
                            ? dispatch(editCourse(courses, newCourseData))
                            : dispatch(addNewCourse(courses, newCourseData))

                        setCourseName('')
                        setCategory('')
                        setContactPhone('')
                        setDescription('')
                        setPaymentTerm('')
                        setTeacherName('')
                        setAddress('')

                        closeForm()
                    } else {
                        setInputError(true)
                    }
                }}>{course? 'Редактировать' : 'Добавить'}</Button>
            </div>

        </form>
    );
};

export default CourseForm;