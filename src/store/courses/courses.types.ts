import {categories} from "./initialState";

export interface ICourse{
    id: string
    address: string
    contactPhone: string
    courseName: string
    category: string
    description: string
    imageUrl: string
    paymentTerms: string
    studentsAge: number[]
    teacherName: string
}

