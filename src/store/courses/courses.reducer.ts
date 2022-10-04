import {v4 as uuidv4} from 'uuid';
import {addresses, categories, courses, paymentTerms} from "./initialState";
import {InferActionsTypes} from "../store";
import {ICourse} from "./courses.types";

const ADD_COURSE = 'course/ADD_COURSE' as const;
const DELETE_COURSE = 'course/DELETE_COURSE' as const;
const EDIT_COURSE = 'course/EDIT_COURSE' as const;

const initialState = {
    courses: courses,
    categories: categories,
    addresses: addresses,
    paymentTerms: paymentTerms
}

export type InitialStateType = typeof initialState

const coursesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}


type ActionsTypes = InferActionsTypes<typeof coursesActions>

export const coursesActions = {
    addCourse: (course: ICourse)=>({
        type: ADD_COURSE,
        course
    }),
    deleteCourse: (id: string)=>({
        type: DELETE_COURSE,
        id
    }),
    editCourse: (course: ICourse)=>({
        type: EDIT_COURSE,
        course
    })
}

export default coursesReducer;