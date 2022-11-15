
import {AnyAction} from "redux";
import { setCoursesState} from "./courses.action";
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

    return state
}


export default coursesReducer;