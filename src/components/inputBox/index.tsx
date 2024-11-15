import React, { forwardRef } from 'react';
import Label from "../../atoms/label";
import Input from "../../atoms/input";
import { ILabelProps } from "../../types/create-membership";
import { InputHTMLAttributes } from "react";

export interface IInputBoxProps
  extends ILabelProps,
    InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}
const InputBox = ({
  label,
  required,
  htmlFor,
  type,
  id,
    value,
  name,
  placeholder,
    isHandleChange
}: IInputBoxProps) => {
  return (
    <div>
      <Label
        htmlFor={htmlFor}
        className={
          type !== "radio"
            ? "flex justify-start text-sm font-medium text-gray-300"
            : ""
        }
      >
        {label}
      </Label>
      <Input onChange={isHandleChange}
        type={type}
        id={id}
             value={value
        required={required}
        name={name}
        placeholder={placeholder}
        className={
          type !== "radio"
            ? "mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            : "form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
        }
      />
    </div>
  );
};

export default InputBox;
