
import {AnyAction} from "redux";
import {setCourses, setCoursesState} from "./courses.action";
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
    if (setCourses.match(action)) {
        return {...state, courses: action.payload}
    }

    return state
}


export default coursesReducer;