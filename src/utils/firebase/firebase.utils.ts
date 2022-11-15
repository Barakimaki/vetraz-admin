import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    getDocs,
} from 'firebase/firestore'
import 'firebase/storage'
import {ICourse} from "../../store/courses/courses.types"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:/* process.env.REACT_APP_FIREBASE_PROJECT_ID*/ "vetraz-f48ba",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID
}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const storage = getStorage(app);

export const getCoursesState = async () => {
    const coursesRef = collection(db, 'courses')
    const querySnapshot = await getDocs(coursesRef)
    const courses = querySnapshot.docs.map(docSnapshot => docSnapshot.data())
    return courses
}

export const setCoursesDB = async (courses: ICourse[]) => {
    await setDoc(doc(db, 'courses', 'courses'), {
        courses
    })
}


