import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import UserImage from "../../atoms/userIMG";
import Layout from "../../layout";
import Theme from "../../components/theme";
import { useThemeStore } from "../../store";
import Post from "../../components/post";
import MyPageButton from "../../atoms/myPageButton";
import PostBox from "../../components/postBox";
import UserInfo from "../../components/userInfo";
import PostCreationForm from "../../components/postCreationForm";
import UserBackgroundPhoto from "../../components/userBackgroundPhoto";
import { useFireBaseImage } from "../../hooks/useFireBaseImage";
import { useMessages } from "../../hooks/useFireBaseWriteNoti";
import { usePosts } from "../../hooks/useFireBaseWriteNoti";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { User } from "firebase/auth";

export default function MyPage() {
  const [isOpenMessageBox, setIsOpenMessageBox] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { isDarkMode } = useThemeStore();

  const {
    user: isUser,
    message,
    setMessage,
    setBeforeMessage: setIsBeforeMessage,
    setIsSaveMessage,
    saveMessage,
    fetchMessage,
  } = useMessages();

  const {
    title: isTitle,
    setTitle: setIsTitle,
    content: postMessage,
    setContent: setPost,
    savePost,
    imageFile,
    setImageFile,
  } = usePosts();

  const [searchParams] = useSearchParams();
  const urlUserId = searchParams.get("userId");

  const {
    isUserImage,
    setIsUserImage,
    isHandleImageChange,
    isFetchImageFile,
    isFileInputRef,
    isHandleEditClick,
  } = useFireBaseImage({
    userId: urlUserId || isUser?.uid || null,
    collectionData: "profileImages",
  });

  const { data: pageUser } = useQuery<User | null>({
    queryKey: ["user", urlUserId],
    queryFn: async () => {
      if (!urlUserId) return isUser;
      const userDoc = await getDoc(doc(db, "users", urlUserId));
      return userDoc.exists() ? (userDoc.data() as User) : null;
    },
    enabled: !!urlUserId,
  });

  const isOwnProfile = !urlUserId || urlUserId === isUser?.uid;

  const isPostHandleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.currentTarget;

    try {
      switch (name) {
        case "title":
          setIsTitle(value);
          break;
        case "content":
          setPost(value);
          break;
      }
    } catch (e) {
      console.error("Error in form change:", e);
    }
  };

  const isMessagesHandleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setMessage(value);
  };

  const onClickPostBox = () => {
    setIsOpenModal((pre) => !pre);
  };

  const onClickMessageBox = () => {
    setIsBeforeMessage(message);
    setIsOpenMessageBox((pre) => !pre);
  };

  const onClickPostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!isUser) {
        console.error("User not logged in");
        return;
      }

      if (!isTitle || !postMessage) {
        console.error("Title or content is missing", { isTitle, postMessage });
        return;
      }

      await savePost();
      setIsTitle("");
      setPost("");
      setImageFile(null);
      setIsOpenModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const onClickMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setIsOpenMessageBox(false);
      await saveMessage();
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  useEffect(() => {
    if (isUser) {
      fetchMessage();
    }
  }, [isUser]);

  return (
    <Layout>
      <Theme>
        {isOwnProfile && isOpenMessageBox && (
          <PostBox
            setIsOpenMessageBox={setIsOpenMessageBox}
            setIsIntroSave={setIsSaveMessage}
            onSubmit={onClickMessageSubmit}
            onClick={onClickMessageBox}
            onChange={isMessagesHandleChange}
            onKeyDown={onClickMessageBox}
          />
        )}
        <main className="max-w-screen-xl mx-auto p-4">
          <div
            className={` ${
              isDarkMode
                ? "bg-gray-800 bg-opacity-50"
                : "bg-purple-300 bg-opacity-10 border border-purple-300"
            }  rounded-lg overflow-hidden backdrop-blur-sm mb-6`}
          >
            <UserBackgroundPhoto isUserState={(pageUser as User) || isUser} />
            <div className="relative px-6 pb-6">
              <UserImage
                isUserState={(pageUser as User) || isUser}
                isUserImage={isUserImage}
                setIsUserImage={setIsUserImage}
                isHandleImageChange={isHandleImageChange}
                isFetchImageFile={isFetchImageFile}
                isFileInputRef={isFileInputRef}
                isHandleEditClick={isHandleEditClick}
                isEditable={isOwnProfile}
              />
              <div className="pt-20">
                <h2 className="text-2xl font-bold">
                  {pageUser?.displayName || isUser?.displayName || ""}
                </h2>
                <p className="text-gray-400 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> Email:{" "}
                  {pageUser?.email || isUser?.email || ""}
                </p>
                <p className="text-gray-400 flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" /> create ID:{" "}
                  {isUser?.metadata.creationTime || ""}
                </p>
                {isOwnProfile && (
                  <MyPageButton
                    value={`소개글 입력하기`}
                    onClick={onClickMessageBox}
                  />
                )}
              </div>
            </div>
          </div>
          <UserInfo
            isPageUser={pageUser}
            isEditable={isOwnProfile}
            isUserState={(pageUser as User) || isUser}
            isMessage={message}
          />
          <div className={`flex flex-col gap-10 justify-around`}>
            {isOwnProfile && (
              <MyPageButton
                onClick={() => onClickPostBox()}
                value={`게시글 작성하기`}
              />
            )}
            <Post
              isUserImage={isUserImage}
              isUser={(pageUser as User) || isUser}
              isTitle={isTitle}
            />
          </div>
        </main>
      </Theme>
      {isOpenModal && (
        <PostCreationForm
          onClickPostBox={onClickPostBox}
          isPostHandleChange={isPostHandleChange}
          onClickPostSubmit={onClickPostSubmit}
          isHandleChage={isMessagesHandleChange}
          isOpenModal={isOpenModal}
          onClick={onClickPostBox}
          isTitle={isTitle}
          postMessage={postMessage}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      )}
    </Layout>
  );
}
