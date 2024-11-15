import Layout from "../../layout";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import Error from "../../atoms/error";
import MembershipInnerContain from "../../components/membershipInnerContain";
import { useState } from "react";

const LOGIN = "Login Click"

export default function Login() {
  const [isError, setIsError] = useState<boolean>(false);



  return (
      <Layout>

        <div className="min-h-screen flex items-center  justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">

          <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl ">
            <div className="absolute inset-0 opacity-20 " />
            <MembershipInnerContain>
              <Form>
                <InputBox
                    value=""
                    label="email"
                    htmlFor="email"
                    type="email"
                    id="email"
                    placeholder="your email"
                    name="email"
                    required
                />
                <InputBox
                    value=""
                    label="password"
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
