
import React from 'react';
import {useState} from "react";

//fire base
import "firebase/firestore"
import {auth, db} from "../../constants/firebase-contants";
import {doc, setDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"


//Router
import {useNavigate} from "react-router-dom";

//atoms
import Layout from "../../layout";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import Error from "../../atoms/error";
import MembershipInnerContain from "../../components/membershipInnerContain";



const Membership = () => {

  const navigate = useNavigate();

  const [isFormData, setIsFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  })

  const [isError, setIsError] = useState<boolean>(false);

   const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIsFormData((pre) => ({
      ...pre, [name]:value
    }))

  }


  console.log("isFormData",isFormData);

  const isHandleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const userCredential = await (createUserWithEmailAndPassword(auth, isFormData.email, isFormData.password))
      const user = userCredential.user

      console.log("isUserData",user)

      await setDoc(doc(db, "users", user.uid), {
          name: isFormData.name,
          email: isFormData.email,
          address: isFormData.address,
      });
      console.log("user 등록이 완료되었습니다.  '다음에 할건 회원가입 완료 시 로그인 페이지로 이동'")
        navigate("/login")
    } catch(e) {
      if(e) {
        console.log("등록오류:", e)
       }
    }

  };

  return (
    <Layout>
      {isError && <Error /> }
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
        <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl ">
          <div className="absolute inset-0 opacity-20 flex flex-col" />
          <MembershipInnerContain>
            <Form isHandleSubmit={isHandleSubmit}>
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
              <Button login={"Click Me!"} />
            </Form>
          </MembershipInnerContain>
        </div>
      </div>
    </Layout>
  );
}
export default Membership;