export enum COURSES_ACTION_TYPES {
    SET_STATE = 'course/SET_STATE',
    ADD_COURSE = 'course/ADD_COURSE',
    EDIT_COURSE = 'course/EDIT_COURSE',
    DELETE_COURSE = 'course/DELETE_COURSE',
    UPDATE_COMMON = 'course/UPDATE_COMMON'
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
        from: number | null
        to: number | null
    }
    teacherName: string,
    schedule: IGroup[]
}

export interface ILesson{
    from: string
    to: string
}

export interface IDay{
    lessons: ILesson[]
}


export interface IGroup{
    groupName: string
    week: IDay[]
}




export type Common = {
    categories: string[],
    addresses: string[],
    paymentTerms: string[]
}

