import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useFireBaseImage } from "../../hooks/useFireBaseImage";
import { ILoadingProps } from "../../types/mainHomepage";
import SkeletonStoryBox from "../../loading/skeleton/skeletonStoryBox";
import { User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
}

// 사용자 프로필 이미지 컴포넌트
export const UserStoryImage = ({
  userId,
  username,
  size = "large", // 'small' | 'large'
}: {
  userId: string;
  username: string;
  size?: "small" | "large";
}) => {
  const { isUserImage } = useFireBaseImage({
    userId,
    collectionData: "profileImages",
  });

  // 구글 프로필 이미지 가져오기
  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.exists() ? userDoc.data() : null;
    },
  });

  // 크기에 따른 클래스 설정
  const sizeClasses = {
    small: "w-8 h-8", // 채팅용 작은 크기
    large: "w-16 h-16", // 스토리용 큰 크기
  };

  const imageClass = `${sizeClasses[size]} object-cover rounded-full border-2 border-gray-800`;

  if (isUserImage?.imageFile) {
    return (
      <img src={isUserImage.imageFile} alt={username} className={imageClass} />
    );
  }

  if (userData?.photoURL) {
    return (
      <img src={userData.photoURL} alt={username} className={imageClass} />
    );
  }

  return (
    <div className={`${imageClass} bg-white flex items-center justify-center`}>
      <UserIcon className={size === "small" ? "h-5 w-5" : "h-8 w-8"} />
    </div>
  );
};

const StoryBox = ({ isLoading }: ILoadingProps) => {
  const navigate = useNavigate();

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        // Authentication 사용자 데이터 가져오기
        const usersSnapshot = await getDocs(collection(db, "users"));
        // console.log("Auth users:", usersSnapshot.docs);

        const users = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            displayName: data.displayName,
            email: data.email,
          };
        });

        // displayName이 있는 사용자만 필터링
        const filteredUsers = users;
        // console.log("Filtered users:", filteredUsers);
        return filteredUsers;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
    enabled: isLoading,
    staleTime: 30000,
  });

  // 유저 프로필로 이동하는 핸들러
  const handleUserClick = (userId: string) => {
    navigate(`/mypage?userId=${userId}`);
  };

  return (
    <div className="mb-10 md:mb-8 overflow-x-auto">
      <div className="flex space-x-4 gap-[1rem]">
        {isLoading ? (
          <div className="flex space-x-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => handleUserClick(user.id)}
                role="button"
                aria-label={`View ${user.displayName || "Anonymous"}'s profile`}
              >
                <div className="w-16 h-16 rounded-full p-0.5 transition-transform transform group-hover:scale-105">
                  <UserStoryImage
                    userId={user.id}
                    username={user?.displayName || "Anonymous"}
                    size="large"
                  />
                </div>
                <span className="text-xs mt-1 group-hover:text-blue-400 transition-colors">
                  {user?.displayName || "Anonymous"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <SkeletonStoryBox />
        )}
      </div>
    </div>
  );
};

export default StoryBox;
