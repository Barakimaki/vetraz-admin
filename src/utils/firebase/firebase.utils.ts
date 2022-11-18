import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteField
} from 'firebase/firestore'
import 'firebase/storage'
import {Common, ICourse} from "../../store/courses/courses.types"
import {deleteObject, getStorage, ref} from "firebase/storage";
import {CoursesState} from "../../store/courses/courses.reducer";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID
}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const storage = getStorage(app);

export const getCoursesState = async () => {
    let coursesState: CoursesState = {
        courses: [],
        categories: [],
        addresses: [],
        paymentTerms: []

    }

    const coursesRef = doc(db, 'courses', 'courses')
    const coursesSnap = await getDoc(coursesRef)
    if (coursesSnap.exists()) {
        let courses = coursesSnap.data()
        for (let course in courses) {
            coursesState.courses.push(courses[course])
        }

    }
    const commonRef = doc(db, 'courses', 'common')
    const commonSnap = await getDoc(commonRef)
    if (commonSnap.exists()) {
        let common = commonSnap.data()
        coursesState.categories = common.categories
        coursesState.addresses = common.addresses
        coursesState.paymentTerms = common.paymentTerms
    }
    return coursesState
}

export  const setCommon = async (common: Common) => {
    const commonRef = doc(db, 'courses', 'common')

    await updateDoc(commonRef, common)
}

export const setCourseDoc = async (course: ICourse) => {

    const coursesRef = doc(db, 'courses', 'courses')

    await updateDoc(coursesRef, {
        [course.id]: course
    })
}

export const removeCourse = async (id: string, imageUrl: string) => {
    const coursesRef = doc(db, 'courses', 'courses')

    if (imageUrl) {
        const imageRef = ref(storage, id)
        await deleteObject(imageRef)
    }
    await updateDoc(coursesRef, {
        [id]: deleteField()
    })
}



