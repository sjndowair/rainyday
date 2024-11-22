import React from "react";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import MembershipInnerContain from "../../components/membershipInnerContain";
import {useState} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../../constants/firebase-contants";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"



const Login = ()=> {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

const onClickLogOut = async  () => {

    const logOut =  signOut(auth);
try {
    await  logOut
    navigate("/membership")

} catch (e){
    console.error(e);
}

}

    const [isInputData, setIsInputData] = useState({
        email: "",
        password: "",
    })

    const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
     setIsInputData((pre) => ({...pre, [name]: value}))
    }

    const isHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
         setIsLoading(true)
        try {
         const  { user, providerId, operationType } = await signInWithEmailAndPassword(auth, isInputData.email, isInputData.password )
        } catch (e) {
            console.log(e)
        }

    }

  return (
      <div>
        <div className="min-h-screen flex items-center  justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
          <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl ">
            <div className="absolute inset-0 opacity-20 " />
            <MembershipInnerContain>
              <Form isHandleSubmit={isHandleSubmit}>
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
                <div className="pb-5"/>
                <Button  />

              </Form>
                <div className="pt-10" />
                <Button onClickLogOut={onClickLogOut}/>
            </MembershipInnerContain>

          </div>

        </div>

      </div>
  );
}

export default Login;
