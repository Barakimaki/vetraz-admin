import {ICourse} from "./courses.types";

export const courses: ICourse[] = [
    {
        id: '1',
        address: 'ул. Чкалова, 1/4',
        contactPhone: '+375 17 242 22 63',
        courseName: 'Компьютер + английский язык',
        category: 'IT-технологии',
        description: 'Программа общественно-гуманитарного профиля, базовый уровень.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/vetraz-f48ba.appspot.com/o/computer_english.jpg?alt=media&token=ecd73530-c121-44de-8410-2a6863793c25',
        paymentTerm: 'обучение на платной основе',
        studentsAge: [6, 7, 8, 9, 10],
        teacherName: 'Лагутко Е. А.'
    },
    {
        id: '2',
        address: 'ул. Чкалова, 1/4',
        contactPhone: '+375 17 373 54 74',
        courseName: 'Flash animate. Основы программной анимации',
        category: 'IT-технологии',
        description: 'Программа общественно-гуманитарного профиля, базовый уровень.',
        imageUrl: '',
        paymentTerm: 'обучение на платной основе',
        studentsAge: [10, 11, 12, 13, 14, 15],
        teacherName: ''
    }
]

export const categories: string[] = [
    'IT-технологии',
    'Декоративное творчество',
    'Вокальное творчество',
    'Хореография',
    'Иностранный язык',
]
export const addresses: string[] = [
    'ул. Чкалова, 1/4',
    'ул. Асаналиева, 48',
    'ул. Ландера, 6а',
    'ул. Левкова, 8/2'
]
export const paymentTerms: string[]=[
    'обучение на платной основе',
    'первый год на платной основе',
    'бесплатное обучение'
]