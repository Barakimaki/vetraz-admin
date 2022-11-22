import React, {ChangeEvent, useState} from 'react';
import {FormHelperText, Typography, Input, TextField, Button} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {useSelector, useDispatch} from "react-redux";
import {
    selectAddresses,
    selectCategories,
    selectCourse,
    selectPaymentTerms
} from "../../store/courses/courses.selectors";
import {Common, ICourse} from "../../store/courses/courses.types";
import {SelectChangeEvent} from "@mui/material/Select";
import SelectItem from "../selectItem/selectItem.component";
import {v4 as uuidv4} from 'uuid'
import {addCourseAsync, editCourseAsync} from "../../store/courses/courses.action";
import {AppDispatch} from "../../store/store";
import {addImg} from "../../utils/firebase/firebase.utils";
import {useNavigate, useParams} from "react-router-dom";
import style from "./courseForm.module.scss";


const CourseForm = () => {

    const navigate = useNavigate()

    let id: string = ''
    let params = useParams()
    if (params.id) {
        id = params.id
    }

    const dispatch: AppDispatch = useDispatch()

    let course: ICourse | null = useSelector(selectCourse(id))

    const categories = useSelector(selectCategories) || []
    const paymentTerms = useSelector(selectPaymentTerms) || []
    const addresses = useSelector(selectAddresses) || []
    const common: Common = {
        categories,
        addresses,
        paymentTerms
    }

    let [inputError, setInputError] = useState(false)
    let [courseName, setCourseName] = useState(course?.courseName || '')
    let [category, setCategory] = useState(course?.category || '')
    let [contactPhone, setContactPhone] = useState(course?.contactPhone || '')
    let [description, setDescription] = useState(course?.description || '')
    let [paymentTerm, setPaymentTerm] = useState(course?.paymentTerm || '')
    let [studentsAge, setStudentsAge] = useState(course?.studentsAge || {from: null, to: null})
    let [teacherName, setTeacherName] = useState(course?.teacherName || '')
    let [address, setAddress] = useState(course?.address || '')
    let [courseId, setCourseId] = useState(course?.id || uuidv4())

    let [imageFile, setImageFile] = useState(null as (null | File))

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0])
        }

    }

    const submitForm = (url?: string) => {
        let newCourseData: ICourse = {
            id: courseId,
            address,
            contactPhone,
            courseName,
            category,
            description,
            imageUrl: url || course?.imageUrl || '',
            paymentTerm,
            studentsAge,
            teacherName
        }
        course
            ? dispatch(editCourseAsync(newCourseData, course))
            : dispatch(addCourseAsync(newCourseData))

        setCourseName('')
        setCategory('')
        setContactPhone('')
        setDescription('')
        setPaymentTerm('')
        setTeacherName('')
        setAddress('')
        setImageFile(null)

        navigate('/')
    }

    const handleSubmitForm = async () => {

        if (courseName.length > 0) {
            if (imageFile) {
                let url = await addImg(courseId, imageFile)
                if (url) {
                    submitForm(url)
                }

            } else {
                submitForm()
            }
        } else {
            setInputError(true)
        }
    }


    return (
        <div className={style.container}>
            <Button variant="contained" onClick={() => navigate('/')}>
                Назад
            </Button>
            <form action="" className={style.form}>
                <Typography gutterBottom variant="h5" component="div">
                    Название курса
                </Typography>
                <FormControl error={inputError} variant="standard" sx={{m: 1, minWidth: 620}}>
                    <Input placeholder="Название курса" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setInputError(false)
                        setCourseName(e.target.value)
                    }} defaultValue={courseName}/>
                    {inputError &&
                        <FormHelperText id="component-error-text">Название не может быть пустым</FormHelperText>}
                </FormControl>
                <Typography gutterBottom variant="h6" component="div">
                    Изображение
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                >
                    Добавить изображение
                    <input type="file" hidden onChange={handleFileChange}/>
                </Button>
                {
                    imageFile ? <Typography gutterBottom variant="caption" component="div">
                        {imageFile.name}
                    </Typography> : ''
                }
                <Typography gutterBottom variant="h6" component="div">
                    Контактный телефон
                </Typography>
                <FormControl variant="standard" sx={{m: 1, minWidth: 240}}>
                    <Input placeholder="Контактный телефон" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setContactPhone(e.target.value)
                    }} type='tel' defaultValue={contactPhone}/>
                </FormControl>
                <Typography gutterBottom variant="h6" component="div">
                    Направление
                </Typography>
                <SelectItem item={category}
                            items={categories}
                            name={'Направление'}
                            handleChange={(event: SelectChangeEvent) => setCategory(event.target.value)}
                            size={320}
                            common={common}
                />

                <Typography gutterBottom variant="h6" component="div">
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
                <Typography gutterBottom variant="h6" component="div">
                    Условие оплаты
                </Typography>
                <SelectItem item={paymentTerm}
                            items={paymentTerms}
                            name={'Условие оплаты'}
                            handleChange={(event: SelectChangeEvent) => setPaymentTerm(event.target.value)}
                            size={320}
                            common={common}
                />
                <Typography gutterBottom variant="h6" component="div">
                    Руководитель
                </Typography>
                <FormControl variant="standard" sx={{m: 1, minWidth: 320}}>
                    <Input placeholder="Руководитель" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTeacherName(e.target.value)
                    }} defaultValue={teacherName}/>
                </FormControl>
                <Typography gutterBottom variant="h6" component="div">
                    Возраст обучающихся
                </Typography>
                <FormControl variant="standard" sx={{m: 1, width: 40}}>
                    <Input type='number' placeholder="с" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setStudentsAge({...studentsAge, from: Number(e.target.value)})
                    }} defaultValue={studentsAge.from}/>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, width: 40}}>
                    <Input type='number' placeholder="по" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setStudentsAge({...studentsAge, to: Number(e.target.value)})
                    }} defaultValue={studentsAge.to}/>
                </FormControl>
                <Typography gutterBottom variant="h6" component="div">
                    Адрес
                </Typography>
                <SelectItem item={address}
                            items={addresses}
                            name={'Адрес'}
                            handleChange={(event: SelectChangeEvent) => setAddress(event.target.value)}
                            size={320}
                            common={common}
                />
                <div>
                    <Button variant="contained" onClick={handleSubmitForm}>
                        {course ? 'Редактировать' : 'Добавить'}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default CourseForm;