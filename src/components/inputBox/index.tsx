import React, { forwardRef } from 'react';
import Label from "../../atoms/label";
import Input from "../../atoms/input";
import { ILabelProps } from "../../types/create-membership";
import { InputHTMLAttributes } from "react";

export interface IInputBoxProps
  extends ILabelProps,
    InputHTMLAttributes<HTMLInputElement> {
  isHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;



}
const InputBox = ({
  label,
  required,
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
        htmlFor={id}
        className={
          type !== "radio"
            ? "flex justify-start text-sm font-medium text-gray-300"
            : ""
        }
      >
        {label}

      <Input onChange={isHandleChange}
        type={type}
        id={id}
             value={value}
        required={required}
        name={name}
             autoComplete="current-password"
        placeholder={placeholder}
        className={
          type !== "radio"
            ? "mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            : "form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
        }
      />
      </Label>
    </div>
  );
};

export default InputBox;
