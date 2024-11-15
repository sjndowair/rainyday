import Input from "../../atoms/input";
import Label from "../../atoms/label";
import { ILabelProps } from "../../types/create-membership";
import { InputHTMLAttributes } from "react";

export interface IRadioBoxProps
  extends ILabelProps,
    InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioBox = ({ type, name, value, isHandleChange }: IRadioBoxProps) => {
  return (
    <Label className=" inline-flex items-center ">
      <Input
        type={type}
        name={name}
        value={value}
        onChange={isHandleChange}
        className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
      />
      <span className="ml-2 text-gray-300">{value}</span>
    </Label>
  );
};

export default RadioBox;
