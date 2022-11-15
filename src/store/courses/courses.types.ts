export enum COURSES_ACTION_TYPES {
    SET_STATE = 'course/SET_STATE'
}

export interface ICourse{
    id: string
    address: string
    contactPhone: string
    courseName: string
    category: string
    description: string
    imageUrl: string
    paymentTerm: string
    studentsAge?: {
        from: number | null,
        to: number | null
    }
    teacherName: string
}

