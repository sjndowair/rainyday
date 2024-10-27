import Layout from "../../layout";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import RadioBox from "../../components/radioBox";
import Error from "../../atoms/error";
import "./style.css";
import MembershipInnerContain from "../../components/membershipInnerContain";
import { useState } from "react";

export default function Membership() {
  const [isError, setIsError] = useState<boolean>(false);

  const isErrorHandle = () => {
    if (InputBox.length === 0) setIsError(true);
  };

  return (
    <Layout>
      {isError ? <Error /> : null}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 p-4">
        {[...Array(20)].map((_, i) => (
          <div
            id="raindrop"
            key={i}
            className="absolute top-[-4rem] w-[2px] h-[10px] rounded-full "
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall ${1 + Math.random() * 1 + 0.5}s linear infinite`,
              animationDelay: `${Math.random() * 1 + 0.5}s`,
            }}
          />
        ))}
        <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden ">
          <div className="absolute inset-0 opacity-20"></div>

          <MembershipInnerContain>
            <Form>
              <InputBox
                value=""
                label="Name"
                htmlFor="name"
                type="text"
                id="name"
                name="name"
                required
                placeholder="yourName"
              />
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
              <div>
                <label className=" text-sm font-medium text-gray-300 mb-2 flex justify-start">
                  your sex
                </label>
                <div className="flex space-x-4">
                  <RadioBox
                    label="your sex"
                    type="radio"
                    name="sex"
                    value="men"
                  />
                  <RadioBox
                    label="your sex"
                    type="radio"
                    name="sex"
                    value="women"
                  />
                </div>
              </div>
              <Button />
            </Form>
          </MembershipInnerContain>
        </div>
      </div>
    </Layout>
  );
}
