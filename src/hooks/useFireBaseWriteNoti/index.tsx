import {useState, useEffect} from "react";
import {User} from "firebase/auth"
import {addDoc, doc, getDoc, collection, setDoc, getDocs, orderBy, query} from "firebase/firestore"
import {auth, db} from "../../constants/firebase-contants";



interface IUseFireBaseWriteNotiProps {
    userId?: string | null;
    data?: string | null
}

interface IIsFetchContentprops {
    id: string;
    createdAt: Date;
    [key: string]: any
}


export const useFireBaseWriteNoti = ({data}:IUseFireBaseWriteNotiProps) => {

    const [isIntroSave, setIsIntroSave] = useState<boolean>(true);
    const [isMessage, setIsMessage] = useState<string>("");

    const [isTitle, setIsTitle] = useState<string>("");
    const [isContent, setIsContent] = useState<string>("");


    const [isUserState, setIsUserState] = useState<null | User>(null);
    const [isPrevMessage, setIsPrevMessage] = useState<string>("");


    const isSaveNoti = async () => {
        if(!isUserState) return
        try{
            if(typeof data === "string"){
                await addDoc(collection(db, data), {
                    title: isTitle,
                    content: isContent,
                    createdAt: new Date().toISOString(),
                    name: isUserState.displayName,
                    user: isUserState.uid
                })
            }
        }catch (error){
            throw new Error(error?.toString())
        }

    }

    const isFetchContent = async (): Promise<IIsFetchContentprops[] | undefined> => {
        if(typeof data === "string"){
            const q = await query(collection(db, data), orderBy("createAt", "desc"))
            const querySnapshot = await getDocs(q)
            const posts: IIsFetchContentprops[] = []
                querySnapshot.forEach(doc => {
                    posts.push({id: doc.id, ...doc.data()} as IIsFetchContentprops)
                })
            return posts;
        }
    }

    const isSaveMessages =  async () => {
     if(!isUserState) return
        try{
           if(typeof data === "string"){
               await setDoc(doc(db, data, isUserState?.uid), {
                   userId: isUserState?.displayName,
                   isMessage: isIntroSave ? isMessage: isPrevMessage,
                   createdAt: new Date().getDay().toString(),
               })
           }
        }catch (error){
         throw new Error(error?.toString())
        }
    }


    const isFetchMessages = async () => {
        if(!isUserState) return
        try{
         if(typeof data === "string"){
             const docSnap = await getDoc(doc(db, data, isUserState?.uid))
             if(docSnap.exists()) setIsMessage(docSnap.data().isMessage);
         }
        }catch(error){
            throw new Error(error?.toString())
        }
    }



    return {isSaveMessages, isFetchMessages, setIsIntroSave, setIsPrevMessage, setIsMessage, isUserState, isMessage, setIsUserState, isPrevMessage, isIntroSave,setIsContent, setIsTitle, isContent, isTitle, isSaveNoti, isFetchContent}

}