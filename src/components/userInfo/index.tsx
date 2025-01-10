
import {useThemeStore} from "../../store";
import {PartyPopper} from "lucide-react";
import {User} from "firebase/auth";


interface IUserInfoProps {
    isMessage?: string;
    isUserState: User | null;
}

const UserInfo  = ({isMessage, isUserState}: IUserInfoProps) => {

    const { isDarkMode } = useThemeStore();


    return (
        <div
            className={`${isDarkMode ? "bg-blue-900 " : "bg-purple-300 bg-opacity-10 border border-purple-300 "} bg-opacity-30 rounded-lg p-4 mb-6`}>
            <h3 className="text-lg font-semibold mb-2">{isUserState?.displayName}님의 한줄 소개글이에요!</h3>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <PartyPopper className="h-8 w-8 text-purple-700 opacity-90"/>
                    <p className="bg-transparent border-b border-purple-600 focus:outline-none focus:border-blue-500 transition-colors">
                        {isMessage || "소개글을 입력해주세요."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo