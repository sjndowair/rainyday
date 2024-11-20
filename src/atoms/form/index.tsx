import React from "react";
import { ILayOutProps } from "../../types/create-membership";

interface IFormProps extends ILayOutProps {
  isHandleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, isHandleSubmit }: IFormProps) => {
  return (
    <form className="space-y-6" onSubmit={isHandleSubmit}>
      {children}
    </form>
  );
};

export default Form;
