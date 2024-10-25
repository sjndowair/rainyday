import { ILayOutProps } from "../../types/create-membership";

const isHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Form = ({ children }: ILayOutProps) => {
  return (
    <form className="space-y-6" onSubmit={isHandleSubmit}>
      {children}
    </form>
  );
};

export default Form;
