import {createSelector} from 'reselect';
import {RootState} from "../store";
import {CoursesState} from "./courses.reducer";

const selectCoursesReducer = (state: RootState): CoursesState => state.courses;


export const selectCourse = (id: string) => createSelector(
    [selectCoursesReducer],
    (courses) => {
        for(let course of courses.courses){
            if(course.id === id){
                return course
            }
        }
        return null
    }
)

export const selectCourses = createSelector(
    [selectCoursesReducer],
    (courses) => courses.courses
);

export const selectCategories = createSelector(
    [selectCoursesReducer],
    (courses) => courses.categories
);

export const selectAddresses = createSelector(
    [selectCoursesReducer],
    (courses) => courses.addresses
);

export const selectPaymentTerms = createSelector(
    [selectCoursesReducer],
    (courses) => courses.paymentTerms
);
