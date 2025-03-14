import React, { useEffect, useState } from "react";
import { useStore, useThemeStore } from "../../store";
import { auth } from "../../constants/firebase-contants";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { User, Key, GlobeLock, Store, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface INotiProps {
  children?: React.ReactNode | string | JSX.Element;
}

const USER = auth.currentUser;

const Noti = ({ children }: INotiProps) => {
  const [isUserState, setIsUserState] = useState(USER);
  const { isToggleModal, isCloseModal } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserState(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isOnClickLogOut = async () => {
    const logOut = signOut(auth);
    try {
      await logOut;
      navigate("/");
      isToggleModal();
    } catch (error) {
      console.log("logOut error:", error);
    }
  };

  const isOnClickGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/");
      isToggleModal();
      console.log("USER signed in:", result.user);
    } catch (error) {
      console.log("USER signed in Error:", error);
    }
  };

  const navigate = useNavigate();

  const onClickUserItem = (key: string) => {
    switch (key) {
      case "로그인":
        navigate("/login");
        isCloseModal();
        break;
      case "회원가입":
        navigate("/membership");
        isCloseModal();
        break;
      case "마이페이지":
        navigate("/mypage");
        isCloseModal();
        break;
      case "구글로 로그인하기":
        isOnClickGoogleSignIn();
        break;
      case "로그아웃":
        isOnClickLogOut();
        break;
    }
  };

  const SIGN_IN = [
    { key: "마이페이지", icon: <User /> },
    { key: "로그아웃", icon: <LogOut /> },
  ];

  const NO_SIGN_USER = [
    { key: "로그인", icon: <Key /> },
    { key: "회원가입", icon: <Store /> },
    { key: "구글로 로그인하기", icon: <GlobeLock /> },
  ];
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <div
        className={`z-[99999] rounded-2xl fixed top-[4.5rem] xl:right-[1%] lg:right-[2%] right-[2%] w-[300px] max-w-full 
            ${
              isDarkMode
                ? " bg-gray-800 text-white shadow-blue-700 shadow-2xl"
                : "bg-gray-100 text-black shadow-purple-500 shadow-xl"
            }
            `}
      >
        <ul className={`flex flex-col py-6 `}>
          {isUserState && (
            <div
              className={` shadow-sm mx-3 pl-5 pt-3 m flex justify-center mb-3 flex-col gap-1 pb-5 ${
                isDarkMode
                  ? "shadow-blue-500 bg-blue-800 text-white"
                  : "shadow-purple-500 bg-purple-500 text-purple-900"
              } rounded-xl bg-opacity-40`}
            >
              <li>
                어서오세요{" "}
                <span className={`text-xl`}>{isUserState?.displayName}</span> 님
              </li>
              <li>{isUserState?.email}</li>
            </div>
          )}
          {!isUserState
            ? NO_SIGN_USER.map((e, i) => (
                <li
                  className={`flex gap-3 mx-5 pl-2 transition-all duration-200 ease-in 
                        hover:cursor-pointer  rounded-md hover:bg-opacity-20 py-5  ${
                          isDarkMode
                            ? "hover:bg-blue-300 hover:text-blue-700"
                            : "hover:bg-purple-300 hover:text-purple-700"
                        }`}
                  key={i}
                  onClick={() => {
                    onClickUserItem(e.key);
                  }}
                >
                  <span>{e.icon} </span> <span>{e.key}</span>
                </li>
              ))
            : SIGN_IN.map((e, i) => (
                <li
                  className={`flex gap-3 mx-5 pl-2 transition-all duration-200 ease-in 
                  hover:cursor-pointer  rounded-md hover:bg-opacity-20 py-5  ${
                    isDarkMode
                      ? "hover:bg-blue-300 hover:text-blue-400"
                      : "hover:bg-purple-300 hover:text-purple-700"
                  }`}
                  key={i}
                  onClick={() => {
                    onClickUserItem(e.key);
                  }}
                >
                  <span>{e.icon} </span> <span>{e.key}</span>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default Noti;
