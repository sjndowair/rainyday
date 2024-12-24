import {useState} from "react";
import {db} from "../../constants/firebase-contants"
import {addDoc, collection, getDoc, doc} from "firebase/firestore";


interface IUserStateProps {
    isUserState: any;
}


const UserImage = ({isUserState}:IUserStateProps) => {

    const getBase = (fire: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fire);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })
    }


    const isSaveImgFireBase = async (imageFlie: Blob) => {
     try{
         const getImageBase = await getBase(imageFlie);
         const docRef = await addDoc(collection(db, "image"), {
             image: getImageBase,
             createTime: new Date(),
         });
         console.log(docRef);
      } catch (error) {
         console.log(error);
      }
    }

    const isFetchImgFireBase = async (imageFlie: string) => {
        try{
            const docRef =  doc(db, "image", imageFlie);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()) console.log("이미지가 존재하지않습니다.")
            if(docSnap.exists()) {
                const imageDocSnap = docSnap.data().image;
                return imageDocSnap
            }

        } catch(error){
             console.log(error)
        }
    }





    return (
        <div className={`relative`}>

                <img
                    src={isUserState?.photoURL ? isUserState?.photoURL : ""}
                    alt={`${isUserState?.email}의 사진`}
                    className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800"
                />



            <div
                className={`text-[0] ${isUserState ? " bg-[#72E5F2]" : "bg-gray-900"} shadow-[0_0_4rem_rgba(10,205,206,0.5)] w-[2rem] h-[2rem] rounded-2xl bottom-[-3rem] absolute left-[8rem] z-10 `}>로그인
                활성화 상태
            </div>

        </div>
    )
}

export default UserImage