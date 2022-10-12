export enum COURSES_ACTION_TYPES {
    SET_COURSES = 'course/SET_COURSES'
}

export interface ICourse{
    id: string
    address: string
    contactPhone: string
    courseName: string
    category: string
    description: string
    imageUrl: string
    paymentTerms: string
    studentsAge?: number[]
    teacherName: string
}

