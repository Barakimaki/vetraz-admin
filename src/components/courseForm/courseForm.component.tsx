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
import {ICourse} from "../../store/courses/courses.types";
import {SelectChangeEvent} from "@mui/material/Select";
import SelectItem from "../selectItem/selectItem.component";
import {v4 as uuidv4} from 'uuid'
import { updateCourseAsync} from "../../store/courses/courses.action";
import {AppDispatch} from "../../store/store";
import {storage} from "../../utils/firebase/firebase.utils";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

type Props = {
    id: string
    closeForm: () => void
}

const CourseForm = ({closeForm, id}: Props) => {

    const dispatch: AppDispatch = useDispatch()

    let course: ICourse | null = useSelector(selectCourse(id))
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
    let [courseId, setCourseId] = useState(course?.id || uuidv4())

    let [imageFile, setImageFile] = useState(null as (null | File))

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0])
        }

    }

    const handleFileSubmit = (): Promise<string | void> => {
        const imageRef = ref(storage, courseId)
        if (imageFile) {
            return uploadBytes(imageRef, imageFile)
                .then(() => {
                    return getDownloadURL(imageRef)
                        .then((url) => {
                            return url
                        })
                        .catch((error) => {
                            console.log(error.message, "error getting the image url");
                        })
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }
        return Promise.resolve('')
    };

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
            studentsAge: course?.studentsAge || { from: 0, to: 0},
            teacherName
        }

        dispatch(updateCourseAsync(newCourseData))

        setCourseName('')
        setCategory('')
        setContactPhone('')
        setDescription('')
        setPaymentTerm('')
        setTeacherName('')
        setAddress('')
        setImageFile(null)

        closeForm()
    }

    const handleSubmitForm = () => {
        if (courseName.length > 0) {
            if (imageFile) {
                handleFileSubmit()
                    .then(url => {
                        if (url) {
                            submitForm(url)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                submitForm()
            }
        } else {

            setInputError(true)
        }

    }


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
                <Button variant="contained" onClick={handleSubmitForm}>
                    {course ? 'Редактировать' : 'Добавить'}
                </Button>
            </div>

        </form>
    );
};

export default CourseForm;