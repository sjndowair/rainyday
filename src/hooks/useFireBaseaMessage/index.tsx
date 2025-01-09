import {useRef, useState} from "react";
import {User} from "firebase/auth"
import {setDoc, doc, getDoc} from "firebase/firestore"
import {db} from "../../constants/firebase-contants"


interface IUserFireBaseMessage {
    collectionName?: string | null;
    dataType?: string | null;
    data?: string | null
}

export const useFireBaseaMessage = ({collectionName, data, dataType}: IUserFireBaseMessage) => {

    const [isIntroSave, setIsIntroSave] = useState<boolean>(true);
    const [isMessage, setIsMessage] = useState<string>("");
    const [isPrevMessage, setIsPrevMessage] = useState<string>("");

    const [isUserState, setIsUserState] = useState<User | null>(null);
    const [isCotent, setIsContent] = useState<string>("");



    const isSaveMessages = async () => {
        if(!isUserState) return
        try{
          if(typeof data === "string"){
              await setDoc(doc(db, data, isUserState?.uid), {
                   userId: isUserState?.displayName,
                   isMessage: isIntroSave ? isMessage : isPrevMessage,
                  createAt: new Date().toISOString(),
              })
          }
        }catch(error){
           throw new Error(error?.toString())
        }
    }

    console.log(isMessage)


    const isFetchMessages = async () => {
        if(!isUserState) return
        try {
         if(typeof data === "string"){
             const docSnap = await getDoc(doc(db, data, isUserState?.uid))
             if(docSnap.exists()) setIsMessage(docSnap.data().isMessage);

         }
        }catch (error){
         throw new Error(error?.toString())
        }
    }
    return {isSaveMessages, isFetchMessages, isMessage, setIsMessage, isCotent, setIsContent, isIntroSave, setIsIntroSave ,setIsUserState, setIsPrevMessage, isPrevMessage, isUserState}

    }

