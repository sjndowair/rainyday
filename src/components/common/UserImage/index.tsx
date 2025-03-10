import { useFireBaseImage } from "../../../hooks/useFireBaseImage";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { User as UserIcon } from "lucide-react";

interface UserImageProps {
  userId: string;
  size?: "sm" | "md" | "lg"; // sm: 32px, md: 40px, lg: 64px
}

const UserImage = ({ userId, size = "md" }: UserImageProps) => {
  const { isUserImage } = useFireBaseImage({
    userId,
    collectionData: "profileImages", // 프로필 이미지용
  });

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.exists() ? userDoc.data() : null;
    },
  });

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  // 1순위: Firebase Storage의 이미지
  if (isUserImage?.imageFile) {
    return (
      <img
        src={isUserImage.imageFile}
        alt="프로필 이미지"
        className={`${sizeClasses[size]} rounded-full mr-3 object-cover`}
      />
    );
  }

  // 2순위: 구글 프로필 이미지
  if (userData?.photoURL) {
    return (
      <img
        src={userData.photoURL}
        alt="프로필 이미지"
        className={`${sizeClasses[size]} rounded-full mr-3 object-cover`}
      />
    );
  }

  // 3순위: 기본 아이콘
  return (
    <div
      className={`${sizeClasses[size]} rounded-full mr-3 bg-white flex items-center justify-center`}
    >
      <UserIcon
        className={`${size === "lg" ? "h-8 w-8" : "h-6 w-6"} text-gray-400`}
      />
    </div>
  );
};

export default UserImage;
