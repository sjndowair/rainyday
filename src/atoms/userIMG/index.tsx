import { useEffect, Dispatch, RefObject, ChangeEvent } from "react";
import { db } from "../../constants/firebase-contants";
import { getDoc, doc } from "firebase/firestore";
import MyPageButton from "../myPageButton";
import { User } from "firebase/auth";
import { User as UserIcon } from "lucide-react";

interface IUserStateProps {
  isUserState: User | null;
  isUserImage: any;
  setIsUserImage: Dispatch<any>;
  isHandleImageChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isFetchImageFile: (imageId?: string) => Promise<string | null>;
  isFileInputRef: RefObject<HTMLInputElement>;
  isHandleEditClick: () => void;
  isEditable?: boolean;
}

const UserImage = ({
  isHandleEditClick,
  isFileInputRef,
  isFetchImageFile,
  isHandleImageChange,
  isUserState,
  isUserImage,
  setIsUserImage,
  isEditable,
}: IUserStateProps) => {
  useEffect(() => {
    const fetchUserData = async () => {
      if (isUserState?.uid) {
        const userDoc = await getDoc(doc(db, "images", isUserState.uid));
        if (userDoc.exists() && userDoc.data().imageId) {
          const fetchedImage = await isFetchImageFile(userDoc.data().imageId);
          if (fetchedImage) {
            setIsUserImage({ imageFile: fetchedImage });
          }
        }
      }
    };
    fetchUserData();
  }, [isUserState]);

  return (
    <div className={`relative`}>
      {isUserImage?.imageFile ? (
        <img
          src={isUserImage.imageFile}
          alt={`${isUserState?.email}의 사진`}
          className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800"
        />
      ) : isUserState?.photoURL ? (
        <img
          src={isUserState.photoURL}
          alt={`${isUserState?.email}의 사진`}
          className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800"
        />
      ) : (
        <div className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800 bg-white flex items-center justify-center">
          <UserIcon className="h-16 w-16 text-gray-400" />
        </div>
      )}

      <div
        className={`text-[0] ${
          isUserState ? " bg-[#72E5F2]" : "bg-gray-900"
        } shadow-[0_0_4rem_rgba(10,205,206,0.5)] w-[2rem] h-[2rem] rounded-2xl bottom-[-3rem] absolute left-[8rem] z-10 `}
      >
        로그인 활성화 상태
      </div>
      <div className={`float-right h-[auto]`}>
        <input
          type="file"
          ref={isFileInputRef}
          onChange={isHandleImageChange}
          accept="image/*"
          className={`hidden`}
        />
        {isEditable && (
          <MyPageButton
            onClick={isHandleEditClick}
            value={`프로필 사진 변경`}
          />
        )}
      </div>
    </div>
  );
};

export default UserImage;
