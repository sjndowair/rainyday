import Form from "../../atoms/form";
import Button from "../../atoms/button";
import InputBox from "../../components/inputBox";
import RadioBox from "../../components/radioBox";
// import Button from "../../atoms/button";
import MembershipInnerContain from "../../components/membershipInnerContain";
// import { CloudRain, Umbrella } from "lucide-react";

export default function Membership() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 p-4">
      <div className="relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-0.5 h-8 bg-blue-400 rounded-full"
              style={{
                top: "-50px",
                left: `${Math.random() * 100}%`,
                animation: `fall ${1 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <MembershipInnerContain>
          <Form>
            <InputBox
              label="Name"
              htmlFor="name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="yourName"
            />
            <InputBox
              label="email"
              htmlFor="email"
              type="email"
              id="email"
              name="email"
              required
            />
            <RadioBox type="radio" name="sex" value="men" />

            <div>
              <label className=" text-sm font-medium text-gray-300 mb-2 flex justify-start">
                your sex
              </label>
              <div className="flex space-x-4">
                <label className=" inline-flex items-center ">
                  <input
                    type="radio"
                    name="sex"
                    value="men"
                    className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-300">men</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="woman"
                    className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-300">women</span>
                </label>
              </div>
            </div>
            <Button />
          </Form>
        </MembershipInnerContain>
      </div>
    </div>
  );
}
