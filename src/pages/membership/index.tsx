import { useState } from "react";

//fire base
import {auth, db, USER_COLLECTION} from "../../constants/firebase-contants";

//atoms
import Layout from "../../layout";
import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import RadioBox from "../../components/radioBox";
import Error from "../../atoms/error";
import MembershipInnerContain from "../../components/membershipInnerContain";


const Membership = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const isErrorHandle = () => {
    if (InputBox.length === 0) setIsError(true);
  };

  return (
    <Layout>
      {isError ? <Error /> : null}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-200">
        <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl ">
          <div className="absolute inset-0 opacity-20" />
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
              <InputBox
                  value=""
                  label="address"
                  htmlFor="address"
                  type="text"
                  id="address"
                  placeholder="your address"
                  name="address"
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
              <Button login={"Click Me!"} />
            </Form>
          </MembershipInnerContain>
        </div>
      </div>
    </Layout>
  );
}
export default Membership;