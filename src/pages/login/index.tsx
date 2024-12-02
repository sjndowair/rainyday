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
import Theme from "../../components/theme";
import {useThemeStore} from "../../store";
import CenterBox from "../../components/centerBox";



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
            console.log(user)
            console.log(providerId)
            console.log(operationType)
            navigate("/home")
        } catch (e) {
            console.log(e)
        }

    }

  return (
      <Theme>
        <div className="min-h-screen  p-8 flex items-center justify-center ">

          <CenterBox>
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
                <div className={`pt-1`} />
                  <Button>로그인</Button>

              </Form>
                <div className="pt-5" />
                <Button onClickLogOut={onClickLogOut}>로그아웃</Button>
                <div onClick={() => navigate("/membership")} className={`pt-6 cursor-pointer hover:underline`}>회원가입 하러가기</div>
            </MembershipInnerContain>

          </CenterBox>

        </div>

      </Theme>
  );
}

export default Login;
