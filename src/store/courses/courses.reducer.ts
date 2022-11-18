import {AnyAction} from "redux";
import {addCourse, deleteCourse, editCourse, setCoursesState, updateCommon} from "./courses.action";
import {ICourse} from "./courses.types";

export type CoursesState = {
    courses: ICourse[]
    categories: string[]
    addresses: string[]
    paymentTerms: string[]
}

const COURSE_INITIAL_STATE: CoursesState = {
    courses: [],
    categories: [],
    addresses: [],
    paymentTerms: []
}


const coursesReducer = (state = COURSE_INITIAL_STATE,
                        action: AnyAction): CoursesState => {
    if (setCoursesState.match(action)) {
        return {...action.payload}
    }
    if (addCourse.match(action)) {
        return {...state, courses: [...state.courses, action.payload]}
    }
    if (editCourse.match(action)) {
        const newCourses = [...state.courses].map(course => {
            if (course.id === action.payload.id) {
                return action.payload
            } else {
                return course
            }
        })
        return {
            ...state, courses: newCourses
        }
    }
    if(updateCommon.match(action)){
        return {
            ...state,
            addresses: action.payload.addresses,
            categories: action.payload.categories,
            paymentTerms: action.payload.paymentTerms
        }
    }
    if(deleteCourse.match(action)){
        const newCourses = [...state.courses].filter(course => course.id !== action.payload)
        return {
            ...state, courses: newCourses
        }
    }

    return state
}


export default coursesReducer;