import React from "react";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import MembershipInnerContain from "../../components/membershipInnerContain";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../constants/firebase-contants";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Theme from "../../components/theme";
import CenterBox from "../../components/centerBox";

type TErrorCode =
  | "auth/cancelled-popup-request"
  | "auth/popup-closed-by-user"
  | "auth/popup-blocked"
  | "auth/invalid-email"
  | "auth/user-disabled"
  | "auth/user-not-found"
  | "auth/wrong-password";

const ERROR_KIND = {
  "auth/cancelled-popup-request":
    "팝업이 열려있습니다. 팝업을 닫고 다시 시도해주세요",
  "auth/popup-closed-by-user":
    "인증완료가 되기전에 팝업이 닫혔습니다. 다시 인증해주세요",
  "auth/popup-blocked": "팝업이 차단되었습니다. 팝업 차단 기능을 해제해주세요",
  "auth/invalid-email": "유효하지 않은 이메일 주소입니다.",
  "auth/user-disabled": "이 사용자 계정은 비활성화되었습니다.",
  "auth/user-not-found": "해당 이메일로 등록된 사용자가 없습니다.",
  "auth/wrong-password": "잘못된 비밀번호입니다.",
  default: "로그인 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
};

const getErrorMessage = (errorCode: unknown) => {
  return ERROR_KIND[errorCode as TErrorCode] || ERROR_KIND["default"];
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isInputData, setIsInputData] = useState({
    email: "",
    password: "",
  });

  const isUnknownErrorBox = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isOnClickGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);

      if (auth.currentUser && !auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName:
            result.user.displayName || result.user.email?.split("@")[0],
        });
      }

      navigate("/");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        setIsErrorMessage(
          getErrorMessage(error as { code: string; message: string })
        );
      }
      isUnknownErrorBox();
    }
  };

  const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIsInputData((pre) => ({ ...pre, [name]: value }));
  };

  const isOnClickSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e) {
      setIsLoading(true);
      setIsErrorMessage("입력값이 없습니다. 아이디를 입력해주세요");
    }
    isUnknownErrorBox();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const { user } = await signInWithEmailAndPassword(
        auth,
        isInputData.email,
        isInputData.password
      );

      navigate("/profile");
    } catch (error: unknown) {
      setIsLoading(true);
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        setIsErrorMessage(
          getErrorMessage(error as { code: string; message: string })
        );
      }
      isUnknownErrorBox();
      console.log("is sign in error:", error);
    }
  };

  return (
    <Theme>
      <div className="min-h-screen  p-8 flex items-center justify-center ">
        {/* {isLoading && <Error value={isErrorMessage} />} */}
        <CenterBox>
          <div className="absolute inset-0 opacity-20 " />

          <MembershipInnerContain>
            <Form isHandleSubmit={isOnClickSignIn}>
              <InputBox
                value={isInputData.email}
                label="email"
                isHandleChange={isHandleChange}
                htmlFor="email"
                type="email"
                id="email"
                placeholder="your email"
                name="email"
                required
              />
              <InputBox
                value={isInputData.password}
                label="password"
                isHandleChange={isHandleChange}
                htmlFor="password"
                type="password"
                id="password"
                placeholder="your password"
                name="password"
                required
              />
              <div className={`pt-1`} />
              <Button>로그인</Button>
              <Button onClick={isOnClickGoogleSignIn}>
                구글계정으로 로그인하기
              </Button>
            </Form>
            <div className="pt-5" />

            <div
              onClick={() => navigate("/membership")}
              className={`pt-6 cursor-pointer hover:underline`}
            >
              회원가입 하러가기
            </div>
          </MembershipInnerContain>
        </CenterBox>
      </div>
    </Theme>
  );
};

export default Login;
