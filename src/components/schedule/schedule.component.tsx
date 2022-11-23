import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {selectCourse} from "../../store/courses/courses.selectors";
import {Button, Input} from "@mui/material";
import {ICourse, IGroup, ILesson} from "../../store/courses/courses.types";
import style from './schedule.module.scss'
import {editCourseAsync} from "../../store/courses/courses.action";
import FormControl from "@mui/material/FormControl";


const Schedule = () => {

    const dispatch: AppDispatch = useDispatch()

    const [newGroup, setNewGroup] = useState('')
    const [addNewGroup, setAddNewGroup] = useState(false)
    const [newLesson, setNewLesson] = useState({from: '', to: ''})
    const [addNewLesson, setAddNewLesson] = useState([false, false, false, false, false, false, false])

    const navigate = useNavigate()

    let id: string = ''
    let params = useParams()
    if (params.id) {
        id = params.id
    }

    let course = useSelector(selectCourse(id))

    let [schedule, setSchedule] = useState(course?.schedule || [] as IGroup[])

    useEffect(() => {
        if (course) {
            setSchedule(course?.schedule)
        }
    }, [course])

    const handleAddGroup = (groupName: string) => {
        let newSchedule = [...schedule, {
            groupName, week: [
                {dayName: 'Понедельник', lessons: []},
                {dayName: 'Вторник', lessons: []},
                {dayName: 'Среда', lessons: []},
                {dayName: 'Четверг', lessons: []},
                {dayName: 'Пятница', lessons: []},
                {dayName: 'Суббота', lessons: []},
                {dayName: 'Воскресенье', lessons: []}
            ]

        }]
        setSchedule(newSchedule)
        setAddNewGroup(false)
    }

    const handleAddLesson = (lesson: ILesson, groupIndex: number, dayIndex: number) => {
        let newSchedule = JSON.parse(JSON.stringify(schedule))
        newSchedule[groupIndex].week[dayIndex].lessons = [...newSchedule[groupIndex].week[dayIndex].lessons, lesson]
        setSchedule(newSchedule)
        let addLesson = [...addNewLesson]
        addLesson[dayIndex] = false
        setAddNewLesson(addLesson)
        setNewLesson({from: '', to: ''})
    }

    const saveSchedule = async () => {
        if (course) {
            let newCourse: ICourse = {...course, schedule}
            await dispatch(editCourseAsync(newCourse, course))
            navigate('/')
        }
    }


    return (
        <div className={style.container}>
            <Button variant="contained" onClick={() => navigate('/')}>
                Назад
            </Button>
            <div>
                <h1>{course?.courseName}</h1>
                {schedule.map((group, groupIndex) => {
                    return <div>
                        <h2>{group.groupName}</h2>
                        <div className={style.week}>
                            {group.week.map((day, dayIndex) => {
                                return <div className={style.day}>
                                    <h3>{day.dayName}</h3>
                                    <hr/>
                                    {day.lessons.map(lesson => <p>{lesson.from} - {lesson.to}</p>)}
                                    {addNewLesson[dayIndex]
                                        ? <div>
                                            <FormControl variant="standard" sx={{m: 1, width: 60}}>
                                                <Input type='text' placeholder="с"
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           setNewLesson({...newLesson, from: e.target.value})
                                                       }} defaultValue={''}/>
                                            </FormControl>
                                            <FormControl variant="standard" sx={{m: 1, width: 60}}>
                                                <Input type='text' placeholder="по"
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           setNewLesson({...newLesson, to: e.target.value})
                                                       }} defaultValue={''}/>
                                            </FormControl>
                                            <Button variant="contained"
                                                    onClick={() => handleAddLesson(newLesson, groupIndex, dayIndex)}>
                                                Принять
                                            </Button>
                                        </div>
                                        : <div>
                                            <Button variant="contained" onClick={() => {
                                                let addLesson = [...addNewLesson]
                                                addLesson[dayIndex] = true
                                                setAddNewLesson(addLesson)
                                            }}>
                                                Добавить
                                            </Button>
                                        </div>
                                    }

                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
            {addNewGroup
                ? <div>
                    <Input placeholder="Имя новой группы" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setNewGroup(e.target.value)
                    }}/>
                    <Button variant="contained" onClick={() => handleAddGroup(newGroup)}>
                        Добавить
                    </Button>
                </div>
                : <div>
                    <Button variant="contained" onClick={() => {
                        setAddNewGroup(true)
                    }}>
                        Добавить новую группу
                    </Button>
                </div>
            }
            <div className={style.button}>
                <Button variant="outlined" onClick={() => {
                    saveSchedule()
                }}>
                    Сохранить расписание
                </Button>
            </div>

        </div>
    );
};

export default Schedule;