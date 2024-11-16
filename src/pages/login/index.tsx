import React from "react";
import Layout from "../../layout";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import Error from "../../atoms/error";
import MembershipInnerContain from "../../components/membershipInnerContain";
import {useState} from "react";


const LOGIN = "Login Click"

const Login = ()=> {

    const [isInputData, setIsInputData] = useState({
        email: "",
        password: "",
    })

    const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
     setIsInputData((pre) => ({...pre, [name]: value}))
    }

    const isHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

  return (
      <Layout>

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
                <Button login={LOGIN} />
              </Form>
            </MembershipInnerContain>

          </div>

        </div>
        <Error />
      </Layout>
  );
}

export default Login;
