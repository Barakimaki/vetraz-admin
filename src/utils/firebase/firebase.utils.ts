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
import {CoursesState} from "../../store/courses/courses.reducer";

const firebaseConfig = {
    apiKey: "AIzaSyDX7kY4Mik9kKyW-RcMocFlnHQ_VlGUbcE",
    authDomain: "vetraz-f48ba.firebaseapp.com",
    projectId: "vetraz-f48ba",
    storageBucket: "vetraz-f48ba.appspot.com",
    messagingSenderId: "162354729966",
    appId: "1:162354729966:web:83fc5901705338674334ff",
    measurementId: "G-BB0KRCPE05"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// export const getCourses = async ()=>{
//     const collectionRef = collection(db, 'courses');
//     const q = query(collectionRef);
//
//     const querySnapshot = await getDocs(q);
//     console.log(querySnapshot)
//     return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
// }