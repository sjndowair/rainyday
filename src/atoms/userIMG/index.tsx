import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {storage} from "../../constants/firebase-contants";


interface IUserStateProps {
    isUserState: any;
}

// firebase 유료로 인한 임시 기능 of
const UserImage = ({isUserState}:IUserStateProps) => {
//
//        const [isFile, setIsFile] = useState<File | null>(null);
//        const [imageUrl, setImageUrl] = useState<string>('');
//
//
//        const onClickFileChage = (event: React.ChangeEvent<HTMLInputElement>) => {
//             event.currentTarget.files && setIsFile(event.currentTarget.files[0])
//        }
//
//        const isHandleUpload = async () => {
//
//            if(isFile){
//                const storageRef = ref(storage, `image/${isFile.name}`)
//                await uploadBytes(storageRef, isFile)
//                const url = await getDownloadURL(storageRef)
//                setImageUrl(url)
//            }
//        }

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