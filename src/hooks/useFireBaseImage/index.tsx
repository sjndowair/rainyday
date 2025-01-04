import {addDoc, doc, getDoc, collection, setDoc} from "firebase/firestore";
import {Ref, useRef, useState} from "react";
import {db} from "../constants/firebase-contants"


interface IUserFileBaseImageProps {
    userId: string | null
    collectionData: string;

}

export const useFireBaseImage = ({userId, collectionData}: IUserFileBaseImageProps ) => {

    const [isUserImage, setIsUserImage] = useState<{imageFile:   null | string | undefined  } >({imageFile: null});
    const isFileInputRef = useRef<HTMLInputElement>(null);

    const isGetBase = (fire: Blob): Promise<string | ArrayBuffer | null> => {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fire);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })
    }

    const isSaveImageFireBase = async (imageFlie: Blob): Promise<string | ArrayBuffer | null | undefined> => {
        try{
            const isGetImageBase = await isGetBase(imageFlie);
            const docRef = await addDoc(collection(db, collectionData), {
                image: isGetImageBase,
                createTime: new Date().toISOString(),
            })
            return docRef.id;
        }catch (error) {
            throw new Error(error?.toString())
        }
    }

    const isFetchImageFile = async (file: string): Promise<string | null> => {
        try {
            const docRef = doc(db, collectionData, file);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) return null;
            const image = docSnap.data()?.image;
            return image
        } catch (error) {
            console.error("Error fetching image file:", error);
            return null;
        }
    }

    const isUpdateUserImageId = async (imageId: string) => {
     try {
         if(userId){
             const useRef = doc(db, collectionData, userId);
             await setDoc(useRef, {
                 imageId: imageId,
             })
         }
         console.log(typeof userId, userId);
         return userId

     } catch (error) {
         throw new Error(error?.toString())
     }
    }
    const isHandleEditClick = () => {
       isFileInputRef?.current?.click()
    }


    const isHandleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.currentTarget?.files?.[0];
       try{
           if(userId && file) {
               const isSaveId = await isSaveImageFireBase(file);
               if(typeof isSaveId === "string"){
                   await isUpdateUserImageId(isSaveId);
                   const isFetchedImage = await isFetchImageFile(isSaveId);
                   typeof isFetchedImage === "string" && isFetchedImage && await setIsUserImage({imageFile: isFetchedImage})
               }
           }
       } catch(error) {
           throw new Error(error?.toString())
       }
    }


    return {isFetchImageFile, isSaveImageFireBase, isUpdateUserImageId, isHandleEditClick, isHandleImageChange, isUserImage, setIsUserImage, isFileInputRef}
}