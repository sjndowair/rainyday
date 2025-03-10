import { useThemeStore } from "../../store";
import { PartyPopper } from "lucide-react";
import { User } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

interface IUserInfoProps {
  isMessage?: string;
  isUserState: User | null;
  isEditable?: boolean;
  isPageUser?: User | null;
}

const UserInfo = ({
  isMessage,
  isUserState,
  isPageUser,
  isEditable,
}: IUserInfoProps) => {
  const { isDarkMode } = useThemeStore();

  // 사용자의 메시지 가져오기
  const { data: userMessage } = useQuery({
    queryKey: ["userMessage", isUserState?.uid],
    queryFn: async () => {
      if (!isUserState?.uid) return null;
      const messageDoc = await getDoc(doc(db, "messages", isUserState.uid));
      return messageDoc.exists() ? messageDoc.data().message : null;
    },
    enabled: !!isUserState?.uid,
  });

  // 자신의 프로필이면 isMessage를, 다른 사용자의 프로필이면 userMessage를 표시
  const displayMessage = isEditable ? isMessage : userMessage;

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-blue-900 "
          : "bg-purple-300 bg-opacity-10 border border-purple-300 "
      } bg-opacity-30 rounded-lg p-4 mb-6`}
    >
      <h3 className="text-lg font-semibold mb-2">
        {isUserState?.displayName}님의 한줄 소개글이에요!
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <PartyPopper
            className={`h-8 w-8  opacity-90 ${
              isDarkMode ? "text-blue-700" : "text-purple-700"
            }`}
          />
          <p
            className={`bg-transparent border-b border-purple-600 focus:outline-none  transition-colors ${
              isDarkMode ? "border-blue-600" : "border-purple-600"
            }`}
          >
            {displayMessage || "소개글을 입력해주세요."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
