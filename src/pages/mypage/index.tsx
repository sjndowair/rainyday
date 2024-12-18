
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
  Edit,
  MapPin,
  Calendar,
  PartyPopper
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import Layout from "../../layout";
import Theme from "../../components/theme";
import { MYPAGE_DUMMY_DATA } from "../../dummy/dummy-data";
import {useThemeStore} from "../../store";
import {auth, db} from "../../constants/firebase-contants";
import {onAuthStateChanged, User } from "firebase/auth";
import {doc, getDoc,  addDoc, setDoc, collection} from "firebase/firestore"

interface IUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  creationTime: string;
}

const useProfile = (userId: string) => {
  const queryClient = useQueryClient();


};

export default function MyPage() {

  const [isMessage, setIsMessage] = useState<string>("");
  const [isOpenMessageBox, setIsOpenMessageBox] = useState(false);
  const { isDarkMode } = useThemeStore();
  const [isUserState, setIsUserState] = useState<User | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserState(currentUser);
    });

    return () => unsubscribe();
  }, []);

// console.log(isUserState)

  const onClickMessageBox = () => {
    setIsOpenMessageBox((pre) => !pre);
  };

  const onClickSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenMessageBox(false);
    isSaveMessages()
  };

  const isHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsMessage(value);
  };

  console.log(isMessage)


  const isSaveMessages = async () => {
    if (!isUserState) return;
    try {
      await setDoc(doc(db, "userMessages", isUserState?.uid), {
        userId: isUserState.uid,
        isMessage: isMessage,
        createdAt: new Date(),
      });
      console.log(isMessage)
    } catch (error) {

    }
  };

  // Firestore에서 자기소개 불러오기
  const isFetchMessages = async () => {
    if (!isUserState) return;
    try {
      const docRef = doc(db, "userMessages", isUserState.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        setIsMessage(docSnap.data().isMessage);
      }
    } catch (error) {
      console.error("자기소개 불러오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (isUserState) {
      isFetchMessages();
    }
  }, [isUserState]);




  const navigate = useNavigate();

  return (

<Layout>
    <Theme>

      {isOpenMessageBox && <div
          className={`max-w-[500px] w-[100%] rounded-2xl p-10 bg-opacity-70  h-[20rem] bg-purple-400 absolute top-[50%] translate-x-[-50%]  translate-y-[-50%] left-[50%]  z-[10] `}>
        <label className={`flex flex-col gap-10 justify-around`}>
        <p className={`font-bold text-2xl`}>자신을 소개 해주세요!</p>
          <form method="post" onSubmit={onClickSubmit} className={`flex gap-2 w-full`}>
             <input onChange={isHandleChange} className={`h-[2.5rem]`} placeholder={`입력해주세요`} />
             <button onKeyDown={() => onClickMessageBox()} onClick={() => onClickMessageBox()} className={`h-[2.5rem]`} type={"button"}>클릭</button>
          </form>
        </label>
      </div>}

      <main className="max-w-screen-xl mx-auto p-4">
        {/* Profile Section */}
        <div
            className={` ${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-300 bg-opacity-10 border border-purple-300"}  rounded-lg overflow-hidden backdrop-blur-sm mb-6`}>
          <div
              className={`relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 ${isDarkMode ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gradient-to-r from-pink-400 to-purple-400 border border-purple-300"}`}>
            <button
                className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Edit className="h-5 w-5"/>
            </button>
          </div>
          <div className="relative px-6 pb-6">
            <div className={`relative`}>
              <img
                  src={isUserState?.photoURL ? isUserState?.photoURL : ""}
                  alt={`${isUserState?.email}의 사진`}
                  className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-gray-800"
              />
              {isUserState && <div
                  className={`text-[0] bg-[#72E5F2] shadow-[0_0_4rem_rgba(10,205,206,0.5)] w-[2rem] h-[2rem] rounded-2xl bottom-[-3rem] absolute left-[8rem] z-10 `}>로그인
                활성화</div>}
            </div>
            <div className="pt-20">
              <h2 className="text-2xl font-bold">{isUserState?.email || ""}</h2>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1"/> Email: {isUserState?.email || ""}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1"/> create ID: {isUserState?.metadata.creationTime || ""}
              </p>
              <button onClick={() => onClickMessageBox()}
                      className={`text-purple-800 font-semibold mt-4 bg-purple-300 rounded-2xl inline-block p-2 bg-opacity-50 shadow-purple-500 shadow-md  transition-all duration-200 ease hover:cursor-pointer hover:bg-opacity-50 hover:shadow-purple-500 hover:shadow-sm `}>
                소개글 입력하기
              </button>

            </div>
          </div>
        </div>


        <div
            className={`${isDarkMode ? "bg-blue-900 " : "bg-purple-300 bg-opacity-10 border border-purple-300 "} bg-opacity-30 rounded-lg p-4 mb-6`}>
          <h3 className="text-lg font-semibold mb-2">{isUserState?.displayName}님의 소개글이에요!</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PartyPopper className="h-8 w-8 text-purple-700 opacity-90"/>
              <p className="bg-transparent border-b border-purple-600 focus:outline-none focus:border-blue-500 transition-colors">
                {isMessage || "소개글을 입력해주세요."}
              </p>
            </div>
          </div>
        </div>


        <div className="space-y-6">
          {MYPAGE_DUMMY_DATA.map((post) => (
              <div
                  key={post.id}
                  className={`${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-800 bg-opacity-10 hover:bg-opacity-20"} rounded-lg overflow-hidden backdrop-blur-sm transition-all hover:bg-opacity-70`}
              >
                <div className="p-4">
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                      <img
                          src={post.image}
                          alt="Post content"
                          className="w-full rounded-lg mb-4"
                      />
                  )}
                  <p className="text-sm text-gray-400 mb-2">
                    Wearing: {post.outfit}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex space-x-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </main>


    </Theme>
</Layout>

  );
}
