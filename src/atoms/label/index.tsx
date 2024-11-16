import { ILabelProps } from "../../types/create-membership";

const Label = ({ htmlFor, className, children }: ILabelProps) => {
  return (
    <label htmlFor={htmlFor} className="flex flex-col items-start">
      {children}
    </label>
  );
};

export default Label;
