
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
  MapPin,
  Calendar,
} from "lucide-react";
import UserImage from "../../atoms/userIMG";
import Layout from "../../layout";
import Theme from "../../components/theme";
import {useThemeStore} from "../../store";
import {auth, db} from "../../constants/firebase-contants";
import {onAuthStateChanged } from "firebase/auth";
import Post from "../../components/post";
import MyPageButton from "../../atoms/myPageButton";
import PostBox from "../../components/postBox";
import UserInfo from "../../components/userInfo";
import PostCreationForm from "../../components/postCreationForm";
import UserBackgroundPhoto from "../../components/userBackgroundPhoto";
import {useFireBaseData} from "../../hooks/useFireBaseWriteNoti";






export default function MyPage() {


  const [isOpenMessageBox, setIsOpenMessageBox] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isDarkMode } = useThemeStore();


  const {isUser, setIsUser, isMessage: message,
    setIsMessage: setMessage, isFetchData: fetchMessage, isSaveData: isSaveMessages,
    isSaveMessage,  setIsSaveMessage, isBeforeMessage, setIsBeforeMessage

  } = useFireBaseData({collectionName: "message", dataType:"message"})



  const isDirectionModalState = () => {
    setIsOpenModal((pre) => !pre)

  }

  const isHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setMessage(value);
  };


  const onClickMessageBox = () => {
    setIsBeforeMessage(message);
    setIsOpenMessageBox((pre) => !pre);
  };


  const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenMessageBox(false);
    if (isSaveMessage) {
      await isSaveMessages(new Blob());
      await fetchMessage();
    } else {
      setMessage(isBeforeMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUser(currentUser);

    });
    return () => unsubscribe();

  }, []);




  return (

<Layout>
    <Theme>

      {isOpenMessageBox &&
          <PostBox setIsOpenMessageBox={setIsOpenMessageBox} setIsIntroSave={setIsSaveMessage} onSubmit={onClickSubmit} onClick={onClickMessageBox} onChange={isHandleChange} onKeyDown={onClickMessageBox} />}
      <main className="max-w-screen-xl mx-auto p-4">
        <div
            className={` ${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-300 bg-opacity-10 border border-purple-300"}  rounded-lg overflow-hidden backdrop-blur-sm mb-6`}>
          <UserBackgroundPhoto isUserState={isUser!} />
          <div className="relative px-6 pb-6">
         <UserImage isUserState={isUser} />
              <div className="pt-20">
              <h2 className="text-2xl font-bold">{isUser?.displayName || ""}</h2>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1"/> Email: {isUser?.email || ""}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1"/> create ID: {isUser?.metadata.creationTime || ""}
              </p>
              <MyPageButton value={`소개글 입력하기`} onClick={onClickMessageBox} />
            </div>
          </div>
        </div>
        <UserInfo isUserState={isUser} isMessage={message} />
        <div className={`flex flex-col gap-10 justify-around`}>
        <MyPageButton onClick={() => isDirectionModalState()} value={`게시글 작성하기`} />
        <Post />
        </div>
      </main>
    </Theme>
  {isOpenModal && (<PostCreationForm isOpenModal={isOpenModal} data={"posts"} onClick={isDirectionModalState} />)}
</Layout>

  );
}
