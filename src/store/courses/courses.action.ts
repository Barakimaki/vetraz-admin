import {COURSES_ACTION_TYPES, ICourse} from "./courses.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {deleteCourse, getCoursesState, setCourseDoc} from "../../utils/firebase/firebase.utils";
import {CoursesState} from "./courses.reducer";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../store";
import {AnyAction} from "redux";


export type SetCoursesState = ActionWithPayload<COURSES_ACTION_TYPES.SET_STATE, CoursesState>

export const setCoursesState = withMatcher((coursesState: CoursesState): SetCoursesState =>
    createAction(COURSES_ACTION_TYPES.SET_STATE, coursesState)
)

// export type SetCourses = ActionWithPayload<COURSES_ACTION_TYPES.SET_COURSES, ICourse[]>
//
// export const setCourses = withMatcher((courses: ICourse[]): SetCourses =>
//     createAction(COURSES_ACTION_TYPES.SET_COURSES, courses)
// )


//Thunk

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export const updateCourseAsync = (course: ICourse): ThunkType => async (dispatch) => {
    await setCourseDoc(course)
    const coursesState = await getCoursesState()
    dispatch(setCoursesState(coursesState))
}

export const deleteCourseAsync = (id: string, imageUrl: string): ThunkType => async (dispatch) => {
    await deleteCourse(id, imageUrl)
    const coursesState = await getCoursesState()
    dispatch(setCoursesState(coursesState))
}

export const getCoursesStateAsync = (): ThunkType => async (dispatch) => {
    const coursesState = await getCoursesState()
    dispatch(setCoursesState(coursesState))
}

