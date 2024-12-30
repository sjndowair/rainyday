
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {
  Edit,
  MapPin,
  Calendar,
  PartyPopper
} from "lucide-react";
import UserImage from "../../atoms/userIMG";
import Layout from "../../layout";
import Theme from "../../components/theme";
import {useThemeStore} from "../../store";
import {auth, db} from "../../constants/firebase-contants";
import {onAuthStateChanged, User } from "firebase/auth";
import {doc, getDoc,  setDoc } from "firebase/firestore"
import Post from "../../components/post";
import MyPageButton from "../../atoms/myPageButton";
import PostBox from "../../components/postBox";
import UserInfo from "../../components/userInfo";
import PostCreationForm from "../../components/postCreationForm";
import UserBackgroundPhoto from "../../components/userBackgroundPhoto";




export default function MyPage() {

  const [isMessage, setIsMessage] = useState<string>("");
  const [isOpenMessageBox, setIsOpenMessageBox] = useState<boolean>(false);
  const [isUserState, setIsUserState] = useState<User | null>(null);
  const [isIntroSave, setIsIntroSave] = useState<boolean>(true)
  const [isPrevMessage, setIsPrevMessage] = useState<string>("")
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isDarkMode } = useThemeStore();



  const isSaveMessages = async () => {
    if (!isUserState) return;
    try {
      await setDoc(doc(db, "userMessages", isUserState?.uid), {
        userId: isUserState.uid,
        isMessage: isIntroSave ? isMessage : isPrevMessage,
        createdAt: new Date(),
      });
    } catch (error) {
     throw new Error(error?.toString());
    }
  };

  const isDirectionModalState = () => {
    setIsOpenModal((pre) => !pre)

  }


  const isFetchMessages = async () => {
    if (!isUserState) return;
    try {
      const docRef = doc(db, "userMessages", isUserState.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setIsMessage(docSnap.data().isMessage);
    } catch (error) {
      throw new Error(error?.toString());
    }
  };

  const isHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsMessage(value);
  };


  const onClickMessageBox = () => {
    setIsPrevMessage(isMessage);
    setIsOpenMessageBox((pre) => !pre);
  };


  const onClickSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenMessageBox(false);
    isIntroSave ? isSaveMessages() : setIsMessage(isPrevMessage);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserState(currentUser);
    });
    return () => unsubscribe();

  }, []);


  useEffect(() => {
    if (isUserState) {
      isFetchMessages();
    }
  }, [isUserState]);

  return (

<Layout>
    <Theme>

      {isOpenMessageBox &&
          <PostBox setIsOpenMessageBox={setIsOpenMessageBox} setIsIntroSave={setIsIntroSave} onSubmit={onClickSubmit} onClick={onClickMessageBox} onChange={isHandleChange} onKeyDown={onClickMessageBox} />}
      <main className="max-w-screen-xl mx-auto p-4">
        <div
            className={` ${isDarkMode ? "bg-gray-800 bg-opacity-50" : "bg-purple-300 bg-opacity-10 border border-purple-300"}  rounded-lg overflow-hidden backdrop-blur-sm mb-6`}>
          <UserBackgroundPhoto isUserState={isUserState!} />
          <div className="relative px-6 pb-6">
         <UserImage isUserState={isUserState} />
              <div className="pt-20">
              <h2 className="text-2xl font-bold">{isUserState?.displayName || ""}</h2>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1"/> Email: {isUserState?.email || ""}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1"/> create ID: {isUserState?.metadata.creationTime || ""}
              </p>
              <MyPageButton value={`소개글 입력하기`} onClick={onClickMessageBox} />
            </div>
          </div>
        </div>
        <UserInfo isUserState={isUserState} isMessage={isMessage} />
        <div className={`flex flex-col gap-10 justify-around`}>
        <MyPageButton onClick={() => isDirectionModalState()} value={`게시글 작성하기`} />

        <Post />
        </div>
      </main>

    </Theme>
  {isOpenModal && (<PostCreationForm isOpenModal={isOpenModal} onClick={isDirectionModalState} />)}
</Layout>

  );
}
