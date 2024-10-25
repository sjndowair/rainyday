import { ILabelProps } from "../../types/create-membership";

const Label = ({ htmlFor, className, children }: ILabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;
