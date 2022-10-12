import {COURSES_ACTION_TYPES, ICourse} from "./courses.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";

const addCourse = (
    courses: ICourse[],
    newCourse: ICourse
): ICourse[] => {
    return [...courses, newCourse]
}

const removeCourse = (
    courses: ICourse[],
    id: string
): ICourse[] => {
    return courses.filter(course => id !== course.id)
}

const editCourses = (
    courses: ICourse[],
    editedCourse: ICourse
): ICourse[] => {
    return courses.map(course => {
        if(course.id === editedCourse.id){
            return editedCourse
        }
        return course
    })
}

export type SetCourses = ActionWithPayload<COURSES_ACTION_TYPES.SET_COURSES, ICourse[]>

export const setCourses = withMatcher((courses:ICourse[]):SetCourses =>
 createAction(COURSES_ACTION_TYPES.SET_COURSES, courses)
)

export const addNewCourse = (
    courses: ICourse[],
    newCourse: ICourse
) => {
    const newCourses = addCourse(courses, newCourse)
    return setCourses(newCourses)
}

export const removeFromCourses = (
    courses: ICourse[],
    id: string
) => {
    const newCourses = removeCourse(courses, id)
    return setCourses(newCourses)
}

export const editCourse = (
    courses: ICourse[],
    editedCourse: ICourse
) => {
    const newCourses = editCourses(courses, editedCourse)
    return setCourses(newCourses)
}

