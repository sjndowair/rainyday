import {addDoc, doc, getDoc, collection, setDoc} from "firebase/firestore";
import {Ref, useRef, useState} from "react";
import {db} from "../constants/firebase-contants"


interface IUserFileBaseImageProps {
    userId: string | null | undefined;
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

    const isFetchImageFile = async (file: string): Promise<string | null | ArrayBuffer | undefined> => {
    try{
        const docRef =  doc(db, collectionData, file)
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()) return null;

         return docSnap.data()?.image;

    } catch(error) {
        throw new Error(error?.toString())
    }
    return
    }

    const isUpdateUserImageId = async (imageId: string) => {
     try {
         if(typeof userId === "string"){
             const useRef = doc(db, collectionData, userId);
             await setDoc(useRef, {
                 imageId: imageId,
             })
         }
         return console.log("userId의 타입이 string이 아닙니다.")
     } catch (error) {
         throw new Error(error?.toString())
     }
    }
    const isHandleEditClick = () => {
       isFileInputRef?.current?.click()
    }


    const isHandleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.currentTarget?.files?.[0];

        if(userId && file) {
          const isSaveId = isSaveImageFireBase(file);
          if(typeof isSaveId === "string"){
              await isUpdateUserImageId(isSaveId);
              const isFetchedImage = await isFetchImageFile(isSaveId);
             typeof isFetchedImage === "string" && isFetchedImage && await setIsUserImage({imageFile: isFetchedImage})
          }

        }


    }


    return {isFetchImageFile, isSaveImageFireBase, isUpdateUserImageId, isHandleEditClick, isHandleImageChange, isUserImage, setIsUserImage, isFileInputRef}
}