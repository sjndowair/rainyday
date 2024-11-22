//React
import React, {useId} from 'react';
import {useState} from "react";

//fire base
import "firebase/firestore"

import {auth, db, USER_COLLECTION} from "../../constants/firebase-contants";
import {doc} from "firebase/firestore"
import {createUserWithEmailAndPassword ,setPersistence,browserLocalPersistence } from "firebase/auth"

//Router
import {useNavigate} from "react-router-dom";

//atoms


import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import MembershipInnerContain from "../../components/membershipInnerContain";



const Membership = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);

    try{
      const { user } = await createUserWithEmailAndPassword(auth, isFormData.email, isFormData.password)
      setPersistence(auth, browserLocalPersistence)
        // const useDoc = doc(USER_COLLECTION, user.uid)
      const { uid } = user
      console.log(uid)

      navigate("/")
    } catch(e) {
      console.log(e);
    }

  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
        <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl ">
          <div className="absolute inset-0 opacity-20 flex flex-col" />
          <MembershipInnerContain>
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
              <Button isLoading={isLoading} login={"Click Me!"} />
            </form>
          </MembershipInnerContain>
        </div>
      </div>
    </div>
  );
}
export default Membership;

