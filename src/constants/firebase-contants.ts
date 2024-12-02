import "firebase/firestore"
import {initializeApp} from "firebase/app"
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import {getFirestore, collection} from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_KEY,
    projectId: process.env.REACT_APP_PROJECT_ID_KEY,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID_KEY,
    appId: process.env.REACT_APP_APP_ID_KEY,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID_KEY,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_KEY,
};




 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const checkIfEmailExists = async (email: string) => {
    try{
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if(signInMethods.length > 0) return true
        console.log("이건 트루임")
    }
    catch (error) {
        console.log("이건 에러임", error);
        return false;
    }
}


console.log(checkIfEmailExists)
