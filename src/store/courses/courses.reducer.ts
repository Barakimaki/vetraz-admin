import {addresses, categories, courses, paymentTerms} from "./initialState";
import {AnyAction} from "redux";
import {setCourses} from "./courses.action";
import {ICourse} from "./courses.types";

export type CoursesState = {
    courses: ICourse[]
    categories: string[]
    addresses: string[]
    paymentTerms: string[]
}

const COURSE_INITIAL_STATE: CoursesState = {
    courses: courses,
    categories: categories,
    addresses: addresses,
    paymentTerms: paymentTerms
}


const coursesReducer = (state = COURSE_INITIAL_STATE,
                        action: AnyAction): CoursesState => {

    if(setCourses.match(action)){
        return {...state, courses: action.payload}
    }

    return state
}


export default coursesReducer;