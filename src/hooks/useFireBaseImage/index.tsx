import { addDoc, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { Ref, useRef, useState, useEffect } from "react";
import { db } from "../../constants/firebase-contants";

interface IUserFileBaseImageProps {
  userId: string | null;
  collectionData: string;
}

export const useFireBaseImage = ({
  userId,
  collectionData,
}: IUserFileBaseImageProps) => {
  const [isUserImage, setIsUserImage] = useState<any>(null);
  const isFileInputRef = useRef<HTMLInputElement>(null);

  const isGetBase = (file: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const isSaveImageFireBase = async (imageFile: Blob) => {
    try {
      const base64Image = await isGetBase(imageFile);
      if (userId && typeof base64Image === "string") {
        const imageDocRef = await addDoc(collection(db, collectionData), {
          image: base64Image,
          createTime: new Date().toISOString(),
        });

        await setDoc(
          doc(db, "users", userId),
          {
            [`${collectionData}Id`]: imageDocRef.id,
          },
          { merge: true }
        );

        return imageDocRef.id;
      }
    } catch (error) {
      throw new Error(error?.toString());
    }
  };

  const isFetchImageFile = async (imageId?: string) => {
    if (!userId) return undefined;
    try {
      if (imageId) {
        const imageDoc = await getDoc(doc(db, collectionData, imageId));
        if (imageDoc.exists()) {
          return imageDoc.data().image;
        }
      } else {
        const userDoc = await getDoc(doc(db, "users", userId));
        // 컬렉션별로 다른 필드 참조
        const imageIdField = `${collectionData}Id`;
        if (userDoc.exists() && userDoc.data()?.[imageIdField]) {
          const imageDoc = await getDoc(
            doc(db, collectionData, userDoc.data()[imageIdField])
          );
          if (imageDoc.exists()) {
            const imageData = imageDoc.data().image;
            setIsUserImage({ imageFile: imageData });
            return imageData;
          }
        }
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      throw new Error(error?.toString());
    }
  };

  useEffect(() => {
    if (userId) {
      isFetchImageFile();
    }
  }, [userId]);

  const isHandleEditClick = () => {
    isFileInputRef?.current?.click();
  };

  const isHandleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.currentTarget?.files?.[0];
    try {
      if (userId && file) {
        const base64Image = await isGetBase(file);
        if (typeof base64Image === "string") {
          await isSaveImageFireBase(file);
          setIsUserImage({ imageFile: base64Image });
        }
      }
    } catch (error) {
      throw new Error(error?.toString());
    }
  };

  return {
    isFetchImageFile,
    isSaveImageFireBase,
    isHandleEditClick,
    isHandleImageChange,
    isUserImage,
    setIsUserImage,
    isFileInputRef,
  };
};
