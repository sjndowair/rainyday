import { InputHTMLAttributes, useState } from "react";
import { IFormProps } from "../../types/create-membership";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [isInputData, setIsInputData] = useState<IFormProps>({
    name: "",
    email: "",
  });

  const isHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setIsInputData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <input
      value={isInputData[props.name as keyof IFormProps]}
      onChange={isHandleChange}
      {...props}
    />
  );
};

export default Input;
