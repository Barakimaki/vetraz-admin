import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import {ICourse} from "../../store/courses/courses.types";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "vetraz-f48ba.firebaseapp.com",
    projectId: "vetraz-f48ba",
    storageBucket: "vetraz-f48ba.appspot.com",
    messagingSenderId: "162354729966",
    appId: "1:162354729966:web:83fc5901705338674334ff",
    measurementId: "G-BB0KRCPE05"
}


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const getCoursesState = async ()=>{
    const coursesRef = collection(db, 'courses');
    const querySnapshot = await getDocs(coursesRef);
    const courses = querySnapshot.docs.map(docSnapshot => docSnapshot.data())
    return courses
}

export const setCoursesDB = async (courses: ICourse[])=>{
    await setDoc(doc(db, 'courses', 'courses'), {
        courses
    });
}
