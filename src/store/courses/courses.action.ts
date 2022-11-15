import {COURSES_ACTION_TYPES, ICourse} from "./courses.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {getCoursesState, setCoursesDB, storage} from "../../utils/firebase/firebase.utils";
import {CoursesState} from "./courses.reducer";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../store";
import {AnyAction} from "redux";
import {ref, deleteObject} from "firebase/storage";

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

export const editCourse = (
    courses: ICourse[],
    editedCourse: ICourse
) => {
    const newCourses = editCourses(courses, editedCourse)
    return setCoursesAsync(newCourses)
}


//Thunk

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export const setCoursesAsync = (courses: ICourse[]): ThunkType => async (dispatch) => {
    await setCoursesDB(courses)
    dispatch(setCourses(courses))
}

export const getCoursesStateAsync = (): ThunkType => async (dispatch) => {
    const coursesState = await getCoursesState()

    let state: CoursesState = {
        addresses: coursesState[0].addresses,
        categories: coursesState[1].categories,
        courses: coursesState[2].courses,
        paymentTerms: coursesState[3].paymentTerms
    }
    dispatch(setCoursesState(state))
}

export const removeFromCoursesAsync = (
    courses: ICourse[],
    id: string,
    imageUrl: string
): ThunkType => async (dispatch) => {
    if (imageUrl) {
        const imageRef = ref(storage, id)
        return deleteObject(imageRef).then(() => {
            const newCourses = removeCourse(courses, id)
            dispatch(setCoursesAsync(newCourses))
        }).catch((error) => {
            console.log(error.message)
        });
    } else {
        const newCourses = removeCourse(courses, id)
        dispatch(setCoursesAsync(newCourses))
    }
}
