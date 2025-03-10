import React from "react";

interface IFormProps {
  children: React.ReactNode;
  isHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form = ({ children, isHandleSubmit }: IFormProps) => {
  return (
    <form onSubmit={isHandleSubmit} className="space-y-4">
      {children}
    </form>
  );
};

export default Form;
