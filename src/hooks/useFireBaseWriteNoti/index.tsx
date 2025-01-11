import {useState, useEffect} from "react";
import {User} from "firebase/auth"
import {addDoc, doc, getDoc, collection, setDoc, getDocs, orderBy, query} from "firebase/firestore"
import {auth, db} from "../../constants/firebase-contants";



interface IUseFireBaseWriteNotiProps {
    collectionName?: string | null;
    dataType?: string | null
}

export const useFirebaseData = ({collectionName, dataType}:IUseFireBaseWriteNotiProps) => {



    const [isUser, setIsUser] = useState<User | null>(null);
    const [isMessage, setIsMessage] = useState<string>("");
    const [isTitle, setIsTitle] = useState<string>("");
    const [isUserName, setIsUserName] = useState<string>("");
    const [isSaveMessage, setIsSaveMessage] = useState<boolean>(true);
    const [isBeforeMessage, setIsBeforeMessage] = useState<string>("");
    const [isImage, setIsImage] = useState<{ imageFile: string | null | undefined }>({imageFile: null});
    const [isCreateTime, setIsCreateTime] = useState<string>("");

    const [isPosts, setIsPosts] = useState<Array<{
        id: string;
        title: string;
        message: string;
        user: string;
        createdAt: string;
        photo?: string;
    }>>([]);



    const isGetImageBase = (fire: Blob): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fire);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })
    }


    const isSaveData = async () => {
        if(!isUser)return
        if(typeof collectionName === "string"){

            try{
                switch(dataType){
                    case "message" :
                        await setDoc(doc(db, collectionName, isUser?.uid), {
                            createdAt: new Date().toISOString(),
                            message: isSaveMessage ? isMessage : isBeforeMessage,
                            user: isUser?.displayName,
                        })
                        break;
                    case "post":
                        // const isGetImage = await isGetImageBase(imageFile)
                        await addDoc(collection(db, collectionName), {
                            title: isTitle,
                            createdAt: new Date().toISOString(),
                            message: isMessage,
                            // photo: isGetImage,
                            user: isUser?.displayName,
                        })
                        break
                }
            }catch (error){
                throw new Error(error?.toString());
            }
        }
    }

    console.log(isMessage)
    const isFetchData = async () => {
        if(!isUser)return
        if(typeof collectionName === "string"){
            try{
                switch(dataType){
                    case "message" :
                        const docSnap = await getDoc(doc(db, collectionName, isUser?.uid))
                        if(docSnap.exists()){
                            setIsMessage(docSnap.data().message)
                        }
                        break
                    case "post":
                        const querySnapshot = await getDocs(query(collection(db, collectionName, isUser?.uid), orderBy("createdAt", "desc")))

                        // const data = querySnapshot.docs.map((doc) => {
                        //     id: isUser?.id,
                        //         ...doc?.data(),
                        // })




                }
            }catch (error){
                throw new Error(error?.toString());
            }
        }
    }

    useEffect(() => {
        if(isUser){
            isFetchData();
        }
    },[isUser])


    return {isFetchData, isSaveData, isMessage, setIsMessage, isUser,
        setIsUser, isBeforeMessage, setIsBeforeMessage, isUserName, setIsUserName, setIsSaveMessage,
        isTitle, setIsTitle, isSaveMessage,  isImage, setIsImage, isCreateTime, setIsCreateTime}

}


