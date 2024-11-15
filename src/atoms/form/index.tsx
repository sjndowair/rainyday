import { ILayOutProps } from "../../types/create-membership";

interface IFormProps extends ILayOutProps {
  isHandleSubmit?: any;
}

const Form = ({ children, isHandleSubmit }: IFormProps) => {
  return (
    <form className="space-y-6" onSubmit={isHandleSubmit}>
      {children}
    </form>
  );
};

export default Form;
