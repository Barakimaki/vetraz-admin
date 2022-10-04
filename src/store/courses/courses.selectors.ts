import {AppStateType} from "../store";
import {ICourse} from "./courses.types";

export const getCourses = (state: AppStateType): ICourse[] => state.courses.courses
export const getCategories = (state: AppStateType): string[] => state.courses.categories
export const getAddresses = (state: AppStateType): string[] => state.courses.addresses
export const getPaymentTerms = (state: AppStateType): string[] => state.courses.paymentTerms