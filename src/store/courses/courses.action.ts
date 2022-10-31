import {COURSES_ACTION_TYPES, ICourse} from "./courses.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {getCoursesState, setCoursesDB} from "../../utils/firebase/firebase.utils";
import {CoursesState} from "./courses.reducer";

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
        if (course.id === editedCourse.id) {
            return editedCourse
        }
        return course
    })
}

export type SetCoursesState = ActionWithPayload<COURSES_ACTION_TYPES.SET_STATE, CoursesState>

export const setCoursesState = withMatcher((coursesState: CoursesState): SetCoursesState =>
    createAction(COURSES_ACTION_TYPES.SET_STATE, coursesState)
)

export type SetCourses = ActionWithPayload<COURSES_ACTION_TYPES.SET_COURSES, ICourse[]>

export const setCourses = withMatcher((courses: ICourse[]): SetCourses =>
    createAction(COURSES_ACTION_TYPES.SET_COURSES, courses)
)

export const addNewCourse = (
    courses: ICourse[],
    newCourse: ICourse
) => {
    const newCourses = addCourse(courses, newCourse)
    return setCoursesAsync(newCourses)
}

export const removeFromCourses = (
    courses: ICourse[],
    id: string
) => {
    const newCourses = removeCourse(courses, id)
    return setCoursesAsync(newCourses)
}

export const editCourse = (
    courses: ICourse[],
    editedCourse: ICourse
) => {
    const newCourses = editCourses(courses, editedCourse)
    return setCoursesAsync(newCourses)
}


//Thunk

// @ts-ignore
export const setCoursesAsync = (courses: ICourse[]) => async (dispatch) => {
    await setCoursesDB(courses)
    dispatch(setCourses(courses))
}

// @ts-ignore
export const getCoursesStateAsync = () => async (dispatch) => {
    const coursesState = await getCoursesState()

    let state: CoursesState = {
        addresses : coursesState[0].addresses,
        categories : coursesState[1].categories,
        courses : coursesState[2].courses,
        paymentTerms : coursesState[3].paymentTerms
    }

    console.log(state)
    dispatch(setCoursesState(state))
}
