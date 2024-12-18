import "firebase/firestore"
import {initializeApp} from "firebase/app"
import {
    getAuth,
    fetchSignInMethodsForEmail,
    User,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup
} from "firebase/auth";
import {getFirestore, addDoc, collection, query, where, getDocs} from "firebase/firestore";


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

// console.log(db)

const [name, age] = ["rlawodnjs", 27];

const addData = async () => {
    await addDoc(collection(db, "user"), {
        user_name: name,
        user_age: age
    });
};

const searchData = async () => {
    const q = query(collection(db, "user"))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};

// 데이터 추가 후 검색 및 출력
// addData().then(() => {
//     searchData().then(results => {
//         console.log("검색 결과:", results);
//         results.forEach(user => {
//             console.log("사용자 이름:", user.user_name);
//             console.log("사용자 나이:", user.user_age);
//             console.log(user)
//         });
//     });
// });

export const firebaseAuth = {
    signInWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        try{
            const userCredetial = await signInWithPopup(auth, provider);
            return userCredetial.user;
        } catch (error) {
            console.error(error);
        }
    },

    signUp: async (email: string, password: string): Promise<User | null> => {
        try{
            const userCredetial = await createUserWithEmailAndPassword(auth, email, password);
            return userCredetial.user;
        } catch(error) {
            console.error(error);
            return null;
        }
    },

    signIn: async (email: string, password: string): Promise<User | null> => {
        try{
            const userCredetial = await signInWithEmailAndPassword(auth, email, password);
            return userCredetial.user;
        } catch(error) {
            console.error(error);
            return null;
        }
    },

    signOut: async ():Promise<void> => {
        try {
            await signOut(auth);
        } catch(error) {
            console.error(error);
        }
    },
};


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

