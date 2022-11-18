import {Common, COURSES_ACTION_TYPES, ICourse} from "./courses.types";
import {ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {removeCourse, getCoursesState, setCourseDoc, setCommon} from "../../utils/firebase/firebase.utils";
import {CoursesState} from "./courses.reducer";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "../store";
import {AnyAction} from "redux";


export type SetCoursesState = ActionWithPayload<COURSES_ACTION_TYPES.SET_STATE, CoursesState>

export const setCoursesState = withMatcher((coursesState: CoursesState): SetCoursesState =>
    createAction(COURSES_ACTION_TYPES.SET_STATE, coursesState)
)

export type AddCourse = ActionWithPayload<COURSES_ACTION_TYPES.ADD_COURSE, ICourse>

export const addCourse = withMatcher((course: ICourse): AddCourse =>
    createAction(COURSES_ACTION_TYPES.ADD_COURSE, course)
)

export type EditCourse = ActionWithPayload<COURSES_ACTION_TYPES.EDIT_COURSE, ICourse>

export const editCourse = withMatcher((course: ICourse): EditCourse =>
    createAction(COURSES_ACTION_TYPES.EDIT_COURSE, course)
)

export type DeleteCourse = ActionWithPayload<COURSES_ACTION_TYPES.DELETE_COURSE, string>

export const deleteCourse = withMatcher((id: string): DeleteCourse =>
    createAction(COURSES_ACTION_TYPES.DELETE_COURSE, id)
)

export type UpdateCommon = ActionWithPayload<COURSES_ACTION_TYPES.UPDATE_COMMON, Common>

export const updateCommon = withMatcher((common: Common): UpdateCommon =>
    createAction(COURSES_ACTION_TYPES.UPDATE_COMMON, common)
)



//Thunk

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export const addCourseAsync = (course: ICourse): ThunkType => async (dispatch) => {
    await setCourseDoc(course)
    dispatch(addCourse(course))

}

export const updateCommonAsync = (common: Common): ThunkType => async (dispatch) => {
    await setCommon(common)
    dispatch(updateCommon(common))
}

export const editCourseAsync = (course: ICourse): ThunkType => async (dispatch) => {
    await setCourseDoc(course)
    dispatch(editCourse(course))
}

export const deleteCourseAsync = (id: string, imageUrl: string): ThunkType => async (dispatch) => {
    await removeCourse(id, imageUrl)
    dispatch(deleteCourse(id))
}

export const getCoursesStateAsync = (): ThunkType => async (dispatch) => {
    const coursesState = await getCoursesState()
    dispatch(setCoursesState(coursesState))
}

