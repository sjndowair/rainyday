//React
import React, {useId, useRef} from 'react';
import {useState} from "react";

//fire base
import "firebase/firestore"
import {auth, db, checkIfEmailExists} from "../../constants/firebase-contants";
import {createUserWithEmailAndPassword ,setPersistence,browserLocalPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth"


//Router
import {useNavigate} from "react-router-dom";

//atoms
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import MembershipInnerContain from "../../components/membershipInnerContain";
import Spinner from "../../loading/spinner";
import Error from "../../atoms/error";
import Theme from "../../components/theme";
import CenterBox from "../../components/centerBox";


const Membership = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailExists, setIsEmailExists] = useState<boolean>(false);
  const [isFormData, setIsFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  })



  const navigate = useNavigate();

   const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIsFormData((pre) => ({
      ...pre, [name]:value
    }))

  }

  const isHandleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailExists= await checkIfEmailExists(isFormData.email);

    if(emailExists) {
      return;
    } else {
        setIsEmailExists(true)
        setTimeout(() => {
            setIsEmailExists(false);
        }, 1000)
    }
console.log("에러박스 상태값", isEmailExists)

    try{
      const { user } = await createUserWithEmailAndPassword(auth, isFormData.email, isFormData.password)
      setPersistence(auth, browserLocalPersistence)
      setIsLoading(true);
      const { uid } = user
      console.log(uid)
     console.log(user)

      navigate("/home")
    } catch(e) {
      console.log(e);
    }

  };

  return (
      <Theme>
          <div
              className="min-h-screen  text-white p-8 flex justify-center items-center ">
              <CenterBox >
                  <div className="absolute inset-0 opacity-20 flex flex-col"/>
                  <MembershipInnerContain>
                      {isEmailExists && <Error isEmailExists={isEmailExists}/>}

                      <form className="space-y-6" onSubmit={isHandleSubmit}>
                          <InputBox
                              value={isFormData.name}
                              label="Name"

                              isHandleChange={isHandleChange}
                              type="text"
                              id="name"
                              name="name"
                              required
                              placeholder="yourName"
                          />
                          <InputBox
                              value={isFormData.email}
                              label="email"
                              isHandleChange={isHandleChange}
                              type="email"
                              id="email"
                              placeholder="your email"
                              name="email"
                              required
                          />
                          <InputBox
                              value={isFormData.password}
                              label="password"
                              isHandleChange={isHandleChange}
                              type="password"
                              id="password"
                              placeholder="your password"
                              name="password"
                              required
                          />
                          <InputBox
                              value={isFormData.address}
                              label="address"
                              isHandleChange={isHandleChange}
                              type="text"
                              placeholder="your address"
                              name="address"
                              required
                          />
                          <Button isLoading={isLoading} login={"Click Me!"}>회원가입</Button>
                      </form>
                      <div onClick={() => navigate("/login")}
                           className="pt-2 cursor-pointer pt-6 hover: underline-offset-1 hover:underline">이미 회원이신가요?<br /> 구글 계정 로그인도 가능해요!
                      </div>
                  </MembershipInnerContain>
              </CenterBox>
          </div>
      </Theme>
  );
}
export default Membership;

