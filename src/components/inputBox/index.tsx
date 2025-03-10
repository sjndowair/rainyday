import Label from "../../atoms/label";
import Input from "../../atoms/input";
import { ILabelProps } from "../../types/create-membership";
import { InputHTMLAttributes } from "react";
import { useThemeStore } from "../../store";

export interface IInputBoxProps
  extends ILabelProps,
    InputHTMLAttributes<HTMLInputElement> {
  isHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}
const InputBox = ({
  label,
  required,
  type,
  id,
  value,
  name,
  placeholder,
  isHandleChange,
}: IInputBoxProps) => {
  const { isDarkMode } = useThemeStore();

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

        <Input
          onChange={isHandleChange}
          type={type}
          id={id}
          value={value}
          required={required}
          name={name}
          autoComplete="current-password"
          placeholder={placeholder}
          className={
            type !== "radio"
              ? `mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md  placeholder-gray-400    
            ${
              isDarkMode
                ? "bg-gray-700"
                : "bg-gray-100 border text-black border-purple-300 bg-opacity-80"
            }`
              : "form-radio text-blue-500  h-4 w-4 "
          }
        />
      </Label>
    </div>
  );
};

export default InputBox;
