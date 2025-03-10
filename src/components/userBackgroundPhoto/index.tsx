import { Edit } from "lucide-react";
import { useThemeStore } from "../../store";
import { useFireBaseImage } from "../../hooks/useFireBaseImage";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../constants/firebase-contants";

interface IUserBackgroundPhotoProps {
  isUserState?: User | null | undefined;
}

const UserBackgroundPhoto = ({ isUserState }: IUserBackgroundPhotoProps) => {
  const { isDarkMode } = useThemeStore();

  const user = isUserState?.uid;

  const {
    isFileInputRef,
    isFetchImageFile,
    setIsUserImage,
    isUserImage,
    isHandleImageChange,
    isHandleEditClick,
  } = useFireBaseImage({
    userId: user || null,
    collectionData: "backgroundImages",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isUserState?.uid) {
          const userDoc = await getDoc(doc(db, "images", isUserState.uid));
          if (userDoc.exists() && userDoc.data().imageId) {
            const fetchedImage = await isFetchImageFile(userDoc.data().imageId);
            if (fetchedImage) {
              setIsUserImage({ imageFile: fetchedImage });
            }
          }
        }
      } catch (error) {
        throw new Error(error?.toString());
      }
    };
    fetchUserData();
  }, [isUserState, isFetchImageFile, setIsUserImage]);

  return (
    <div
      className={`relative h-48 bg-cover bg-center ${
        isDarkMode
          ? "bg-gradient-to-r from-blue-500 to-purple-600"
          : "bg-gradient-to-r from-pink-400 to-purple-400 border border-purple-300"
      }`}
      style={{
        backgroundImage: isUserImage?.imageFile
          ? `url(${isUserImage.imageFile})`
          : isDarkMode
          ? "bg-gradient-to-r from-blue-500 to-purple-600"
          : "bg-gradient-to-r from-pink-400 to-purple-400 border border-purple-300",
      }}
    >
      <button
        onClick={isHandleEditClick}
        className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Edit className="h-5 w-5 text-white" />
      </button>
      <input
        type="file"
        ref={isFileInputRef}
        onChange={isHandleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default UserBackgroundPhoto;
