import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore'
import 'firebase/storage'
import {Common, ICourse} from "../../store/courses/courses.types"
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
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
        coursesState.courses = coursesSnap.data().courses
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

// export const setCourseDoc = async (course: ICourse) => {
//
//     const coursesRef = doc(db, 'courses', 'courses')
//
//     await updateDoc(coursesRef, {
//         [course.id]: course
//     })
// }
//
// export const removeCourse = async (id: string, imageUrl: string) => {
//     const coursesRef = doc(db, 'courses', 'courses')
//
//     if (imageUrl) {
//         const imageRef = ref(storage, id)
//         await deleteObject(imageRef)
//     }
//     await updateDoc(coursesRef, {
//         [id]: deleteField()
//     })
// }

export const addImg = async (id: string, imageFile: File | null): Promise<string | void> => {

    const imageRef = ref(storage, id)
    if (imageFile) {
        await uploadBytes(imageRef, imageFile)
        return await getDownloadURL(imageRef)
    } else {
        return Promise.resolve('')
    }


}

export const addCourseArray = async (course: ICourse) => {
    const coursesRef = doc(db, "courses", "courses")
    await updateDoc(coursesRef, {
        courses: arrayUnion(course)
    });

}

export const removeCourseArray = async (course: ICourse, isDeleteImage: boolean) => {

    const coursesRef = doc(db, "courses", "courses")

    if (course.imageUrl && isDeleteImage) {
        const imageRef = ref(storage, course.id)
        await deleteObject(imageRef)
    }

    await updateDoc(coursesRef, {
        courses: arrayRemove(course)
    });
}



